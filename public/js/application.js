const getInfo = document.getElementById(`${mainBtn.id}`);
getInfo?.addEventListener("click", async (e) => {
  if (e.target.tagName === "BUTTON") {
    let check = document.getElementById("mainDiv").lastChild;
    check.remove();
    let id = e.target.id;
    const response = await fetch("https://api.covid19tracker.ca/summary/split");
    const response2 = await fetch(`https://api.covid19tracker.ca/provinces`);
    const result = await response.json();
    const result2 = await response2.json();
    console.log(result);
    console.log(result2[`${id}`]);
    const map = document.getElementById("mapCanadaDiv");
    if (!map) {
    } else {
      mainDiv.removeChild(map);
    }
    check = document.createElement("div");
    check.classList.add("check");
    check.innerHTML = `
      <br/>
      <h5><ins>Province:</ins> ${result2[id].name}</h5>
      <h5><ins>Population:</ins> ${result2[id].population}</h5>
      <h5><ins>Total cases:</ins> ${result.data[id].total_cases} (${(
      (result.data[id].total_cases / result2[id].population) *
      100
    ).toFixed(2)}%)</h5>
      <h5><ins>Total hospitalizations:</ins> ${
        result.data[id].total_hospitalizations
      }</h5>
      <h5><ins>Total ICU:</ins> ${result.data[id].total_criticals}</h5>
      <h5><ins>Total recoveries:</ins> ${result.data[id].total_recoveries}</h5>
      <h5><ins>Total fatalities:</ins> ${result.data[id].total_fatalities} (${(
      (result.data[id].total_fatalities / result.data[id].total_cases) *
      100
    ).toFixed(2)}%)</h5>
      <h5><ins>Total vaccines distributed:</ins> ${
        result.data[id].total_vaccines_distributed
      }</h5>
      <h5><ins>Total vaccinations:</ins> ${
        result.data[id].total_vaccinations
      }</h5>
      <h5><ins>Total fully vaccinated:</ins> ${
        result.data[id].total_vaccinated
      } (${(
      (result.data[id].total_vaccinated / result2[id].population) *
      100
    ).toFixed(2)}%)</h5>
      <h5><ins>Total boosters #1:</ins> ${result.data[id].total_boosters_1}</h5>
      <h5><ins>Total boosters #2:</ins> ${result.data[id].total_boosters_2}</h5>
      <h5><ins>Total tests distributed:</ins> ${
        result.data[id].total_tests
      }</h5>
      <h5><ins>Last update:</ins> ${result.data[id].date}</h5>`;

    mainDiv.appendChild(check);
  } else {
  }
});
