

console.log("Compare Insure is ready!");


const insuranceCards = document.querySelectorAll(".service-card");

insuranceCards.forEach(function (card) {


    const exploreLink = card.querySelector("a");


    exploreLink.addEventListener("click", function (event) {


        event.preventDefault();


        const category = card.querySelector("h3").textContent;


        alert("You selected " + category + "!");

        console.log("Selected insurance category:", category);
    });

});


console.log("Number of insurance cards:", insuranceCards.length);




const apiUrl = "http://localhost:3001/policies";

const policyList = document.querySelector("#policy-list");
const loadingMessage = document.querySelector("#loading-message");
const errorMessage = document.querySelector("#error-message");

async function fetchSampleData() {
    try {
        loadingMessage.hidden = false;
        loadingMessage.textContent = "Loading information...";
        errorMessage.hidden = true;

        
        const response = await fetch(apiUrl);

        
        if (!response.ok) {
            throw new Error("The server could not provide the data.");
        }

        
        const data = await response.json();

        policyList.innerHTML = "";

        data.forEach(function (item) {
            const article = document.createElement("article");

            const heading = document.createElement("h4");
            heading.textContent = item.type;

            const provider = document.createElement("p");
            provider.textContent = "Provider: " + item.provider;

            const price = document.createElement("p");
            price.textContent = "Sample price: KSh " + item.price;

            const description = document.createElement("p");
            description.textContent = item.description;

            article.append(heading, provider, price, description);
            policyList.appendChild(article);
        });

    } catch (error) {
        errorMessage.textContent =
            "Sorry, we couldn't load the information. Please try again.";
        errorMessage.hidden = false;

        console.error("API request failed:", error);

    } finally {
        loadingMessage.hidden = true;
    }
}


fetchSampleData();




const comparisonForm = document.querySelector("#comparison-form");
const formMessage = document.querySelector("#form-message");


comparisonForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    
    const customerName = document.querySelector("#customer-name").value.trim();
    const insuranceType = document.querySelector("#insurance-type").value;

    if (!customerName || !insuranceType) {
        formMessage.textContent = "Please complete all fields.";
        return;
    }

    
    const comparisonRequest = {
        customerName: customerName,
        insuranceType: insuranceType
    };

    try {
        formMessage.textContent = "Submitting your request...";

        
       const response = await fetch("http://localhost:3001/comparisonRequests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comparisonRequest)
        });

        
        if (!response.ok) {
            throw new Error("The request could not be submitted.");
        }

        
        const result = await response.json();

        
        formMessage.textContent =
    "Your comparison request was saved successfully! Reference: " + result.id;

        console.log("POST response:", result);


        comparisonForm.reset();

    } catch (error) {
        formMessage.textContent =
            "Sorry, we couldn't submit your request. Please try again.";

        console.error("POST request failed:", error);
    }

});

const insuranceFilter = document.querySelector("#insurance-filter");


insuranceFilter.addEventListener("change", function () {

    
    const selectedType = insuranceFilter.value;

    
    const cards = document.querySelectorAll(".service-card");
    cards.forEach(function (card) {

        
        const category = card.querySelector("h3").textContent.trim();

        
        if (selectedType === "all" || category === selectedType) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

});