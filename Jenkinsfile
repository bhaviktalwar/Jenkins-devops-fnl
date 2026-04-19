pipeline {
    agent any

    environment {
        IMAGE_NAME = "task-management-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        // 🔹 1. BUILD + ARTIFACT
        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'

                echo 'Building Docker image...'
                bat 'docker build -t %IMAGE_NAME%:%IMAGE_TAG% .'

                echo 'Tagging image as latest...'
                bat 'docker tag %IMAGE_NAME%:%IMAGE_TAG% %IMAGE_NAME%:latest'

                echo 'Saving artifact...'
                bat 'docker save %IMAGE_NAME%:%IMAGE_TAG% -o app.tar'
            }
        }

        // 🔹 2. TEST (UNIT + INTEGRATION)
        stage('Test') {
            steps {
                echo 'Running unit and integration tests...'
                bat 'npm test'
            }
        }

        // 🔹 3. CODE QUALITY (ADVANCED)
        stage('Code Quality') {
            steps {
                echo 'Running ESLint with strict gating...'
                bat 'npx eslint . --max-warnings=0'

                echo 'Generating ESLint report...'
                bat 'npx eslint . -f json -o eslint-report.json'
            }
        }

        // 🔹 4. SECURITY (ADVANCED)
        stage('Security') {
    steps {
        echo 'Running dependency scan...'
        bat 'npm audit --audit-level=high'

        echo 'Running container scan...'
        bat 'D:\\trivy\\trivy.exe image task-management-app:latest --severity HIGH,CRITICAL'

        echo 'Generating report...'
        bat 'npm audit --json > security-report.json'
    }
}

        // 🔹 5. DEPLOY (STAGING - INFRA AS CODE)
        stage('Deploy (Staging)') {
            steps {
                echo 'Stopping old container...'
                bat 'docker-compose down || exit 0'

                echo 'Deploying new container...'
                bat 'docker-compose up -d'

                echo 'Verifying deployment...'
                bat 'docker ps'
            }
        }

        // 🔹 6. RELEASE (PRODUCTION)
        stage('Release (Production)') {
            steps {
                echo 'Tagging release in Git...'

                bat 'git config user.email "bhavik@example.com"'
                bat 'git config user.name "Bhavik Talwar"'
                bat 'git tag v1.%BUILD_NUMBER%'

                echo 'Tagging Docker image for production...'
                bat 'docker tag %IMAGE_NAME%:%IMAGE_TAG% %IMAGE_NAME%:prod'

                echo 'Deploying to production...'
                bat 'docker stop task-app || exit 0'
                bat 'docker run -d -p 3000:3000 -e NODE_ENV=production %IMAGE_NAME%:prod'
            }
        }

        // 🔹 7. MONITORING & ALERTING
        stage('Monitoring & Alerting') {
            steps {
                echo 'Checking health endpoint...'
                bat 'curl http://localhost:3000/health'

                echo 'Collecting metrics...'
                bat 'curl http://localhost:3000/metrics > metrics.json'

                echo 'Simulating failure alert...'
                bat '''
                curl http://localhost:3000/invalid-endpoint || echo "ALERT: Failure detected"
                '''

                echo 'Strict health check (gating)...'
                bat '''
                curl http://localhost:3000/health || exit 1
                '''
            }
        }
    }

    // 🔹 POST ACTIONS (EXTRA HD TOUCH)
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed! Initiating rollback...'

            bat 'docker stop task-app || exit 0'
            bat 'docker run -d -p 3000:3000 task-management-app:latest'
        }
    }
}
