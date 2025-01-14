pipeline {

   agent any
   
   options {
       ansiColor('xterm')
   }
   
   tools {
       nodejs 'nodejs'
   }
   
   parameters {
        string(
            name: 'TEST_SPEC', 
            defaultValue: 'cypress/e2e/tests/*.cy.js', 
            description: 'Enter the name of the test spec without file extension e.g. LoginTest. Default value will run all the test specs present inside cypress/e2e/tests/ directory.'
        )
        string(
            name: 'RECORD_TESTS', 
            defaultValue: '--record false', 
            description: 'Within CI, you can pass --record argument to record the test runs to later view on cypress dashboard. Remove the false to record the tests.'
        )
        choice(
            name: 'TEST_ENVIRONMENT', 
            choices: [
                'local',
                'dev',
                'qa',
                'stage',
                'prod',
            ], 
            description: 'Specify the test environment. Default will be local.'
        )
        choice(
            name: 'BROWSER', 
            choices: ['electron', 'chrome', 'edge', 'firefox'], 
            description: 'Pick the web browser you want to use to run your scripts. Default will be electron.'
        )
        choice(
            name: 'BROWSER_MODE', 
            choices: ['headless', 'headed'], 
            description: 'By default, Cypress will run tests headlessly.Passing --headed will force the browser to be shown.'
        )
        choice(
            name: 'TAG', 
            choices: [
                '@regression', 
                '@smoke', 
                '@Login', 
                '@productData', 
                '@Search', 
                '@Wishlist', 
                '@Cart'
            ], 
            description: 'Choose the test tag to filter your test scripts'
        )
    }

   stages {
       stage('Stage 1 - Checkout Code') {
            steps {
                 git ([ 
                        branch: 'main',
                        changelog: true,
                        credentialsId: 'simonthepierce',
                        poll: false,
                        url: 'https://github.com/simonthepierce/Cypress'
                ])

                echo 'Code is checked out'
            }
        }
        
       stage('Stage 2 - Installing dependencies') {
           steps {
               bat 'npm i'
               echo 'dependencies installed'
           }
       }
       
       stage('Stage 3 - Clearing old reports') {
           steps {
               bat "npm run report:pre"
           }
       }

       stage('Stage 4 - Ensure Report Directory') {
           steps {
               script {
                   def reportDir = 'cypress/results/cypress-mochawesome-reporter'
                   if (!fileExists(reportDir)) {
                       echo "Creating missing report directory: ${reportDir}"
                       bat "mkdir -p ${reportDir}"
                   }
               }
           }
       }
   }
   
   post {
        always {
            echo 'Publishing the Extent Report'
            publishHTML([
                    allowMissing: true,
                    alwaysLinkToLastBuild: false,
                    keepAll: true,
                    reportDir: 'cypress/results/cypress-mochawesome-reporter',
                    reportFiles: 'index.html',
                    reportName: 'Cypress Mochawesome Report',
                    reportTitles: 'Cypress Test Automation Framework',
                    useWrapperFileDirectly: true
            ])

        }
        
        success {
            echo 'Build Successful'
        }

        failure {
            echo 'Build Failed'
        }

        unstable {
            echo 'Build unstable'
        }
    }
}
