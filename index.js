// document.addEventListener('DOMContentLoaded',function(){

//     const searchButton = document.getElementById('search_btn');
//     const usernameInput = document.getElementById('user_input');
//     const statsContainer = document.querySelector('.stats_container');

//     const easyProgressCircle = document.querySelector('.easy_progress');
//     const mediumProgressCircle = document.querySelector('.medium_progress');
//     const hardProgressCircle = document.querySelector('.hard_progress');

//     const easyLabel = document.getElementById('easy_label');
//     const mediumLabel = document.getElementById('medium_label');
//     const hardLabel = document.getElementById('hard_label');

//     const statsCardContainer = document.querySelector('.stats_cards');


//     // return true or false based on a regulae expression
//     function validateUsername(username){
//         if(username.trim() === ''){
//             alert('Username should not be empty');
//             return false;
//         }
//         const regex = /^[a-zA-Z0-9]+$/;
//         const isMatching = regex.test(username);
//         if(!isMatching){
//             alert('Invalid Username');
//         }
//         return isMatching;

//     }

//     async function fetchUserDetails (username){

//         try{
//             searchButton.textContent = 'Searching....';
//             searchButton.disabled = true;

//             // const responce = await fetch(url);
//              const proxyUrl = 'https://cors-anywhere.herokuapp.com/' 
//             const targetUrl = 'https://leetcode.com/graphql/';
//             const myHeaders = new Headers();
//             myHeaders.append('content-type','application/json');
//              const graphql = JSON.stringify({
//                 query: "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ",
//                 variables: { "username": `${username}` }
//             })

//         const requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: graphql,
//             redirect:'follow'
//         };

//         const response = await fetch(proxyUrl+targetUrl, requestOptions);

//             if(!response.ok){
//                 throw new Error('Unable to fetch the User Details');
//             }
//             const parsedata = await response.json();
//             console.log('Logging Data:',parsedata);

//             displayUserData(parsedata);
//         }

//         catch(error){
//             statsContainer.innerHTML = `<p>${error.message}</p>`
//         }
//         finally{
//             searchButton.textContent = 'Search';
//             searchButton.disabled = false;
//         }

//     }


//     function updateProgress(solved,total,label,circle){
//         const prgressDegree = (solved/total)*100;
//         circle.style.setProperty('--progress-degree',`${prgressDegree}%`);
//         label.textContent = `${solved}/${total}`;
//     }

//     function displayUserData(parsedata){
//         const totalQues = parsedata.data.allQuestionsCount[0].count;
//         const totalEasyQues = parsedata.data.allQuestionsCount[1].count;
//         const totalMediumQues = parsedata.data.allQuestionsCount[2].count;
//         const totalHardQues = parsedata.data.allQuestionsCount[3].count;

//         const solveTotalQues = parsedata.data.matchedUser.submitStats.acSubmissionNum[0].count;
//         const solveTotalEasyQues = parsedata.data.matchedUser.submitStats.acSubmissionNum[1].count;
//         const solveTotalMediumQues = parsedata.data.matchedUser.submitStats.acSubmissionNum[2].count;
//         const solveTotalHardQues = parsedata.data.matchedUser.submitStats.acSubmissionNum[3].count;

//         updateProgress(solveTotalEasyQues,totalEasyQues,easyLabel,easyProgressCircle);
//         updateProgress(solveTotalMediumQues,totalMediumQues,mediumLabel,mediumProgressCircle);
//         updateProgress(solveTotalHardQues,totalHardQues,hardLabel,hardProgressCircle);

//         const cardsData = [
           
//             {
//                 label: 'Overall Submission',value:parsedata.data.matchedUser.submitStats.totalSubmissionNum[0].submissions
//             },
//             {
//                 label: 'Overall Easy Submission',value:parsedata.data.matchedUser.submitStats.totalSubmissionNum[1].submissions
//             },
//             {
//                 label: 'Overall Medium Submission',value:parsedata.data.matchedUser.submitStats.totalSubmissionNum[2].submissions
//             },
//             {
//                 label: 'Overall Hard Submission',value:parsedata.data.matchedUser.submitStats.totalSubmissionNum[3].submissions
//             },
//         ]

//         console.log('Card Data: ',cardsData);

//         statsCardContainer.innerHTML = cardsData.map(
//             data => 
//                     `<div class="card">
//                     <h4>${data.label}</h4>
//                     <p>${data.value}</p>
//                     </div>`
//         ).join('')

//     }

//     searchButton.addEventListener('click',function(){
//         const  username = usernameInput.value;
//         console.log('Loggin Username :',username);
//         if(validateUsername(username)){
//             fetchUserDetails(username);
//         }
//     })



// });


// Wait until the complete HTML document is loaded
document.addEventListener('DOMContentLoaded', function () {

    // =========================================================
    // 1. GET HTML ELEMENTS
    // =========================================================

    // Search button
    const searchButton = document.getElementById('search_btn');

    // Input field where user enters LeetCode username
    const usernameInput = document.getElementById('user_input');

    // Main container for displaying user statistics
    const statsContainer = document.querySelector('.stats_container');

    // Progress circles
    const easyProgressCircle = document.querySelector('.easy_progress');
    const mediumProgressCircle = document.querySelector('.medium_progress');
    const hardProgressCircle = document.querySelector('.hard_progress');

    // Labels inside progress circles
    const easyLabel = document.getElementById('easy_label');
    const mediumLabel = document.getElementById('medium_label');
    const hardLabel = document.getElementById('hard_label');

    // Container where submission cards will be displayed
    const statsCardContainer = document.querySelector('.stats_cards');


    // =========================================================
    // 2. VALIDATE USERNAME
    // =========================================================

    // This function checks whether the username is valid
    // Returns true or false
    function validateUsername(username) {

        // Check if the input is empty
        if (username.trim() === '') {
            alert('Username should not be empty');
            return false;
        }

        // Regular expression:
        // Only letters (A-Z, a-z) and numbers (0-9) are allowed
        const regex = /^[a-zA-Z0-9]+$/;

        // Test the username against the regular expression
        const isMatching = regex.test(username);

        // If username contains invalid characters
        if (!isMatching) {
            alert('Invalid Username');
        }

        // Return true if valid, false if invalid
        return isMatching;
    }


    // =========================================================
    // 3. FETCH LEETCODE USER DATA
    // =========================================================

    async function fetchUserDetails(username) {

        try {

            // Change button text while data is loading
            searchButton.textContent = 'Searching....';

            // Disable button to prevent multiple requests
            searchButton.disabled = true;


            // -------------------------------------------------
            // API URLs
            // -------------------------------------------------

            // CORS proxy
            const proxyUrl =
                'https://cors-anywhere.herokuapp.com/';

            // LeetCode GraphQL endpoint
            const targetUrl =
                'https://leetcode.com/graphql/';


            // -------------------------------------------------
            // Create HTTP headers
            // -------------------------------------------------

            const myHeaders = new Headers();

            // Tell the server that we are sending JSON data
            myHeaders.append(
                'content-type',
                'application/json'
            );


            // -------------------------------------------------
            // GraphQL query
            // -------------------------------------------------

            const graphql = JSON.stringify({

                // Ask LeetCode for:
                // 1. Total questions
                // 2. User's solved questions
                // 3. User's total submissions
                query: `
                    query userSessionProgress($username: String!) {

                        allQuestionsCount {
                            difficulty
                            count
                        }

                        matchedUser(username: $username) {

                            submitStats {

                                acSubmissionNum {
                                    difficulty
                                    count
                                    submissions
                                }

                                totalSubmissionNum {
                                    difficulty
                                    count
                                    submissions
                                }
                            }
                        }
                    }
                `,

                // Send the username to GraphQL
                variables: {
                    username: username
                }
            });


            // -------------------------------------------------
            // Fetch request options
            // -------------------------------------------------

            const requestOptions = {

                // HTTP method
                method: 'POST',

                // Headers
                headers: myHeaders,

                // GraphQL request body
                body: graphql,

                // Follow redirects
                redirect: 'follow'
            };


            // -------------------------------------------------
            // Send request to LeetCode
            // -------------------------------------------------

            const response = await fetch(
                proxyUrl + targetUrl,
                requestOptions
            );


            // Check whether the request was successful
            if (!response.ok) {
                throw new Error(
                     `HTTP Error: ${response.status} ${response.statusText}`
                );
            }


            // Convert response into JavaScript object
            const parsedata = await response.json();

            // Check the API data in the browser console
            console.log('Logging Data:', parsedata);


            // Send the data to displayUserData()
            displayUserData(parsedata);

        }


        // =====================================================
        // 4. HANDLE ERRORS
        // =====================================================

        catch (error) {

            // Show error in browser console
            console.error(error);

            // Display error message on webpage
            statsContainer.innerHTML =
                `<p>${error.message}</p>`;
        }


        // =====================================================
        // 5. ALWAYS RUN AFTER REQUEST
        // =====================================================

        finally {

            // Change button text back to Search
            searchButton.textContent = 'Search';

            // Enable search button again
            searchButton.disabled = false;
        }
    }


    // =========================================================
    // 6. UPDATE PROGRESS CIRCLE
    // =========================================================

    function updateProgress(
        solved,
        total,
        label,
        circle
    ) {

        // Calculate percentage
        //
        // Example:
        // solved = 50
        // total = 100
        //
        // 50 / 100 * 100 = 50%
        const progressDegree = (solved / total) * 100;


        // Update CSS custom property
        //
        // CSS can use:
        // var(--progress-degree)
        circle.style.setProperty(
            '--progress-degree',
            `${progressDegree}%`
        );


        // Update text inside the progress circle
        //
        // Example:
        // 50/100
        label.textContent = `${solved}/${total}`;
    }


    // =========================================================
    // 7. DISPLAY USER DATA
    // =========================================================

    function displayUserData(parsedata) {

        // -----------------------------------------------------
        // TOTAL QUESTIONS
        // -----------------------------------------------------

        // Get total number of questions
        const totalQues =
            parsedata.data.allQuestionsCount[0].count;

        // Get total Easy questions
        const totalEasyQues =
            parsedata.data.allQuestionsCount[1].count;

        // Get total Medium questions
        const totalMediumQues =
            parsedata.data.allQuestionsCount[2].count;

        // Get total Hard questions
        const totalHardQues =
            parsedata.data.allQuestionsCount[3].count;


        // -----------------------------------------------------
        // SOLVED QUESTIONS
        // -----------------------------------------------------

        // Get total solved questions
        const solveTotalQues =
            parsedata.data.matchedUser
                .submitStats.acSubmissionNum[0].count;

        // Get solved Easy questions
        const solveTotalEasyQues =
            parsedata.data.matchedUser
                .submitStats.acSubmissionNum[1].count;

        // Get solved Medium questions
        const solveTotalMediumQues =
            parsedata.data.matchedUser
                .submitStats.acSubmissionNum[2].count;

        // Get solved Hard questions
        const solveTotalHardQues =
            parsedata.data.matchedUser
                .submitStats.acSubmissionNum[3].count;


        // -----------------------------------------------------
        // UPDATE PROGRESS CIRCLES
        // -----------------------------------------------------

        // Easy progress
        updateProgress(
            solveTotalEasyQues,
            totalEasyQues,
            easyLabel,
            easyProgressCircle
        );


        // Medium progress
        updateProgress(
            solveTotalMediumQues,
            totalMediumQues,
            mediumLabel,
            mediumProgressCircle
        );


        // Hard progress
        updateProgress(
            solveTotalHardQues,
            totalHardQues,
            hardLabel,
            hardProgressCircle
        );


        // =====================================================
        // 8. CREATE CARD DATA
        // =====================================================

        // Store card information inside an array
        const cardsData = [

            {
                label: 'Overall Submission',

                value:
                    parsedata.data.matchedUser
                        .submitStats.totalSubmissionNum[0]
                        .submissions
            },

            {
                label: 'Overall Easy Submission',

                value:
                    parsedata.data.matchedUser
                        .submitStats.totalSubmissionNum[1]
                        .submissions
            },

            {
                label: 'Overall Medium Submission',

                value:
                    parsedata.data.matchedUser
                        .submitStats.totalSubmissionNum[2]
                        .submissions
            },

            {
                label: 'Overall Hard Submission',

                value:
                    parsedata.data.matchedUser
                        .submitStats.totalSubmissionNum[3]
                        .submissions
            }
        ];


        // Check card data in console
        console.log('Card Data:', cardsData);


        // =====================================================
        // 9. DISPLAY CARDS ON THE WEBPAGE
        // =====================================================

        // Convert every object in cardsData into HTML
        //
        // map() creates a new array
        //
        // join('') combines all HTML strings together
        statsCardContainer.innerHTML = cardsData.map(

            data => `
                <div class="card">

                    <h4>${data.label}</h4>

                    <p>${data.value}</p>

                </div>
            `

        ).join('');
    }


    // =========================================================
    // 10. SEARCH BUTTON EVENT
    // =========================================================

    searchButton.addEventListener(
        'click',
        function () {

            // Get username from input field
            const username = usernameInput.value;

            // Show username in console
            console.log(
                'Logging Username:',
                username
            );


            // Validate username first
            if (validateUsername(username)) {

                // If username is valid,
                // fetch LeetCode user data
                fetchUserDetails(username);
            }
        }
    );

});