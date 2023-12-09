
document.getElementById("data-form").addEventListener("submit", function (e) {
    e.preventDefault();


    const author = document.getElementById("author").value;
    const img_url = document.getElementById("img_url").value;
    const content = document.getElementById("content").value;
    const hashtag = document.getElementById("hashtag").value;

    const valuesArray = hashtag.split(",");

    const currentDate = new Date();

    const dataObject = {
        author: author,
        img_url: img_url,
        content: content,
        hashtag: valuesArray,
        date: currentDate
    };


    const prevData = JSON.parse(localStorage.getItem("linkdin_data")) || [];


    prevData.push(dataObject);


    localStorage.setItem("linkdin_data", JSON.stringify(prevData));


    document.getElementById("data-form").reset();


    displayData();
});


function displayData() {
    const dataDisplay = document.getElementById("data-display");
    const linkdin_data = JSON.parse(localStorage.getItem("linkdin_data")) || [];

    dataDisplay.innerHTML = "<h2>Stored comments:</h2>";

    if (linkdin_data.length === 0) {
        dataDisplay.innerHTML += "<p>No data available.</p>";
    } else {
        linkdin_data.forEach((data, index) => {
            dataDisplay.innerHTML += `

            <div id="parentDiv">
                <p><strong>post No. ${index + 1}:</strong></p>
                <div>
                <img src="${data.img_url}" alt="no img found">
                </div>
                <div>
                <ul>
                    <li>author: ${data.author}</li>
                    <li>content: ${data.content}</li>
                    <li>hashtag: ${data.hashtag}</li>
                    <li>posted time ago: ${timeDiff(data.date)}</li>
                   
                </ul>
                </div>

                </div>
            `;


        });
    }



}
function timeDiff(postedTime) {
    const postedDate = new Date(postedTime);
    const currentDate = new Date();
    const timeDifference = currentDate - postedDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes > 0) {
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
        return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    }
}


displayData();

