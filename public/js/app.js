const countryForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message')

const $cities = document.querySelector('#cities')

// Templates
const citiesTemplate = document.querySelector('#cities-template').innerHTML





countryForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const country = search.value




    fetch('/cities?country='+ encodeURIComponent(country)).then((response) => {
        response.json().then((data) => {
            if (data.error){

            } else {
                let i = 0;
                for (i ; i < 10; i=i+1) {
                    const html = Mustache.render(citiesTemplate, {
                        name: data[i].name,
                        description: data[i].description
                    })
                    $cities.insertAdjacentHTML('beforeend', html)
                  }




            }
        })
    })
})