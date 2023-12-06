
const wrap_up_button = document.getElementById("wrap_up_button")
const userName = document.getElementById('username')
const loadingIndicator = document.getElementById('loading-indicator');
const progressBarContainer = document.getElementById('progress-bar-container');
const progressBar = document.getElementById('progress-bar');
var visibleDiv = document.getElementById('first_container');
var invisibleDiv = document.getElementById('second_container');


function downloadDivAsImage(divId) {
    const divToDownload = document.getElementById(divId);

    html2canvas(divToDownload).then(function (canvas) {
        // Create an "a" element to trigger the download
        const downloadLink = document.createElement('a');
        // Convert canvas to image data URL
        const imageDataUrl = canvas.toDataURL('image/png');
        // Set the href attribute of the "a" element to the image data URL
        downloadLink.href = imageDataUrl;
        // Set the download attribute with the desired file name
        downloadLink.download = 'downloaded_image.png';
        // Append the "a" element to the document
        document.body.appendChild(downloadLink);
        // Trigger a click on the "a" element to start the download
        downloadLink.click();
        // Remove the "a" element from the document
        document.body.removeChild(downloadLink);
    });
}

document.getElementById('download_button_01').addEventListener('click', function () {
    downloadDivAsImage('download_content_01');
});
document.getElementById('download_button_02').addEventListener('click', function () {
    downloadDivAsImage('download_content_02');
});


function updateProgressBar(loaded, total) {
const percent = (loaded / total) * 100;
progressBar.style.width = percent + '%';
}

async function getData(userName) {
const xhr = new XMLHttpRequest();
const apiUrl = `https://vivacious-tweed-jacket-slug.cyclic.app/app?userName=${userName}`;

xhr.open('GET', apiUrl);

xhr.onprogress = (event) => {
if (event.lengthComputable) {
    updateProgressBar(event.loaded, event.total);
}
};

xhr.onloadstart = () => {
loadingIndicator.style.display = 'block';
progressBarContainer.style.display = 'block';
};

xhr.onloadend = () => {
loadingIndicator.style.display = 'none';
progressBarContainer.style.display = 'none';
progressBar.style.width = '0%';
};

xhr.send();

return new Promise((resolve, reject) => {
xhr.onload = () => {
    if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
    } else {
        reject(new Error(`Error: ${xhr.status} - ${xhr.statusText}`));
    }
};
xhr.onerror = () => {
    reject(new Error('Network error'));
};
});
}


function showInput() {
    var wrapButton = document.getElementById('wrapButton');
    if (wrapButton) {
        wrapButton.style.display = 'none';
    }

    var inputSection = document.getElementById('inputSection');
    if (inputSection) {
        inputSection.style.display = 'block';
    }
}

wrap_up_button.addEventListener('click', async () => {
  const value = userName.value;
    try {
      const data = await getData(value);
      visibleDiv.style.display = 'none';
      invisibleDiv.style.display = 'block';
      console.log(data);

const averageProblemsSolvedContest = data.average_problems_solved_contest;
const contestAttended = data.contest_attended;
const highestRank = data.highest_rank;
const lowestRank = data.lowest_rank;
const maxRating = data.max_rating;
const maxStreak = data.max_streak;
const mostActiveDay = data.most_active_day;
const mostActiveMonth = data.most_active_month;
const mostActiveMonthContest = data.most_active_month_contest;
const totalActiveDays = data.total_active_days;
const totalQuestionsSolved = data.total_questions_solved;
// Now, you can use these variables as needed
console.log(averageProblemsSolvedContest, contestAttended, highestRank, lowestRank, maxRating, maxStreak, mostActiveDay, mostActiveMonth, mostActiveMonthContest, totalActiveDays, totalQuestionsSolved);

document.getElementById('q2live_contest').textContent = contestAttended;
document.getElementById('q2average_solved').textContent = averageProblemsSolvedContest;
document.getElementById('q2maximum_rating').textContent = maxRating;
document.getElementById('q2highest_rank').textContent = highestRank;
document.getElementById('q2lowest_rank').textContent = lowestRank;
document.getElementById('q2active_month').textContent = mostActiveMonthContest
document.getElementById('userNameset01').textContent = "Hello "+value
document.getElementById('userNameset02').textContent = "Hello "+value


document.getElementById('q1total_solved').textContent = totalQuestionsSolved
document.getElementById('q1active_days').textContent = totalActiveDays
document.getElementById('q1max_streak').textContent = maxStreak
document.getElementById('q1active_month').textContent = mostActiveMonth
document.getElementById('q1active_day').textContent = mostActiveDay 





    } catch (error) {
       alert("UserName Doesn't exist!")
       console.error("Error:", error.message);
     }
});


document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});