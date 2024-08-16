function element(tag, classname, id, text) {
  let tags = document.createElement(tag);
  tags.classList = classname;
  tags.id = id;
  tags.innerHTML = text;
  return tags;
}

let container = element("div", "container", "", "");
const h1 = element("h1", "text-center", "title", "Countries Wether Details");
const row = element("div", "row", "", "");

// fetch part

const responce = fetch("https://restcountries.com/v3.1/all");
responce
  .then((data) => data.json())
  .then((result) => {
    //console.log(result)
    for (let i = 0; i < result.length; i++) {
      const col = document.createElement("div");
      col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4";
      col.innerHTML = `
    <div class="card h-100">
    <div class="card-header">
    <h5 class="card-title text-center">${result[i].name.common}</h5>
    </div>
    <div class="img-box">
    <img src="${result[i].flags.png}"class = "card-img-top" alt="country image"/>
    </div>
    <div class="card-body">
    <div class="card-text text-center">Region: ${result[i].region}</div>
    <div class="card-text text-center">capital: ${result[i].capital}</div>
    <div class="card-text text-center">Country code: ${result[i].cca3}</div>
      <div>
      <button class="btn btn-primary ">click for weather </button>
      </div>
      </div>


    
    `;
      row.append(col);
    }
    //Button logic for show the weather

    let buttons = document.querySelectorAll("button");
    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        let latlng = result[index].latlng;
        //console.log(latlng);
        let lat = latlng[0];
        let lng = latlng[1];

        let wetherapi =
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=c0d60bd7ea48a7e4c8f4f202a3d84f32
`);
        wetherapi
          .then((data1) => data1.json())
          .then((res) => {
            alert(
              `weather of ${result[index].name.common}is ${Math.floor(
                res.main.temp
              )}🌡️c`
            );
          });
      });
    });
  });

// append part
container.append(row);
document.body.append(h1, container);
