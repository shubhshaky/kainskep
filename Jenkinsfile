pipeline {
  agent any

  environment {
    AWS_REGION = 'ap-south-1'
    AWS_ACCOUNT_ID = '025066265815'
    FLASK_IMAGE = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/flaskapp:latest"
    NODE_IMAGE = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/nodejsapp:latest"
  }

  stages {

    stage('Checkout') {
      steps {
        git 'https://github.com/shubhshaky/kainskep/'
      }
    }

    stage('Build Docker Images') {
      steps {
        script {
          sh 'docker build -t flaskapp ./flask-app'
          sh 'docker build -t nodejsapp ./nodejs-app'
        }
      }
    }

    stage('ECR Login') {
      steps {
        script {
          sh """
          aws ecr get-login-password --region $AWS_REGION | \
          docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
          """
        }
      }
    }

    stage('Tag and Push Images') {
      steps {
        script {
          sh """
          docker tag flaskapp $FLASK_IMAGE
          docker tag nodejsapp $NODE_IMAGE

          docker push $FLASK_IMAGE
          docker push $NODE_IMAGE
          """
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        script {
          sh """
          kubectl apply -f k8s/flask-deployment.yaml
          kubectl apply -f k8s/nodejs-deployment.yaml
          """
        }
      }
    }
  }
}
