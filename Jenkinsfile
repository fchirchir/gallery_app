pipeline{
    agent any

    environment {
        EMAIL_RECIPIENT = "felixchirchir@gmail.com"
        SLACK_TEAM_DOMAIN = "devops-lej2911"
        SLACK_TOKEN = "0AK8q7LZXMvaKelQZDbWiXNx"
        SLACK_CHANNEL = "chirchir_ip1"
    }

    stages{
        stage('build'){
            steps{
                echo '## Cloning project from remote...'
                nodejs('Node-14.9.0'){
                    sh """
                            mkdir -p /home/felix/Documents/moringa-school-projects/devOps/jenkins_builds
                            cd /home/felix/Documents/moringa-school-projects/devOps/jenkins_builds
                            rm -rf gallery_app
                            git clone https://fchirchir:Chirchir.2015@github.com/fchirchir/gallery_app.git
                            cd gallery_app
                            npm install
                        """
                }
            }
        }

        stage('test'){
            steps{
                echo '## Testing...'
                sh """
                    cd /home/felix/Documents/moringa-school-projects/devOps/jenkins_builds/gallery_app
                    npm test
                """
            }

            post {
                failure {
                    mail(
                        to: "$EMAIL_RECIPIENT",
                        subject: "Build $BUILD_NUMBER - FAILED (${currentBuild.fullDisplayName})",
                        body: "Please check console output at: $BUILD_URL/console" + "\n"
                    )
                }
            }
        }

        stage('deploy'){
            steps{
                echo '## Deploying...'
                sh """
                    cd /home/felix/Documents/moringa-school-projects/devOps/jenkins_builds/gallery_app
                    heroku git:remote -a gallery-friday
                    git push --force heroku master
                """
            }

            post{
                success{
                    slackSend(
                            teamDomain: "$SLACK_TEAM_DOMAIN",
                            token: "$SLACK_TOKEN",
                            channel: "$SLACK_CHANNEL",
                            color: "good",
                            message: "Production deployment build ID $BUILD_ID was a Success! Check it out on $BUILD_URL>"
                    )
                }
            }
        }
    }
}