node{
  def Namespace = "pkapp"
  def ImageName = "maheshkharwadkar/mkimage"
  def Creds	= "amrita"
  def imageTag = "1.0"
  try{
  stage('Checkout'){
      git 'https://github.com/maheshkharwadkar/mk-k8-ci-cd.git'
      //sh "git rev-parse --short HEAD > .git/commit-id"
      //imageTag= readFile('.git/commit-id').trim()



  }


  stage('RUN Unit Tests'){
      sh "npm install"
      sh "npm test"
  }
  stage('Docker Build, Push'){
    withCredentials([usernameColonPassword(credentialsId: 'amrita', variable: 'dockerhub',url: 'https://index.docker.io/v1/')]) {
      sh "docker build -t ${ImageName}:${imageTag} ."
      sh "docker push ${ImageName}"
        }

    }
    stage('Deploy on K8s'){
	script{
        sh "cd ansible/sayarapp-deploy"
	    sh "pwd"
	    sh (
		    script: "cd ansible/sayarapp-deploy && ansible-playbook deploy.yml  --user=jenkins --extra-vars ImageName=${ImageName} --extra-vars imageTag=${imageTag} --extra-vars Namespace=${Namespace} -vv"
        )  
	  }
	}
     } catch (err) {
      currentBuild.result = 'FAILURE'
    }
}
