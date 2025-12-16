
document.getElementById("ctf_answerbox").addEventListener("submit", validateAnswer)

async function validateAnswer(event)
{
    event.preventDefault();
    const form = event.target
    const userInput = await generateHash(document.getElementById("answer").value)
    const result = document.getElementById("result")
    const flag = form.dataset.flag

    if (userInput==flag) 
    {
        result.style.color = "green"
        result.textContent = "Correct! Nice work"
    }
    else
    {
        result.style.color = "red"
        result.textContent = "Incorrect. try again"
    }

}

function generateHash(string)
//This algorithm comes from here: 
// https://remarkablemark.medium.com/how-to-generate-a-sha-256-hash-with-javascript-d3b2696382fd
{
    const utf8 = new TextEncoder().encode(string)
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => 
    {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(bytes => bytes.toString(16).padStart(2, '0')).join('');
        return hashHex;
    });
}