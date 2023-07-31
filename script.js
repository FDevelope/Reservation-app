const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const movie = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();

container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected')
        calculateTotal()
    }
})

movie.addEventListener('change', (e)=>{
    calculateTotal();
})

function calculateTotal(){
    //Eleman sayısını alma
    const selectedSeats = container.querySelectorAll('.seat.selected');
    let selectedSeatCount = selectedSeats.length;

    //Her bir elemanı liste içine ekleme
    const selectedSeatsArr = [];
    const selectedArr = [];

    selectedSeats.forEach((seat)=>{
        selectedSeatsArr.push(seat);
    });

    seats.forEach((seat)=>{
        selectedArr.push(seat)
    })

    //Seçilen indexi array haline getirme
    let selectedSeatIndexs = selectedSeatsArr.map(function(seat){
        return selectedArr.indexOf(seat)
    })

    //Koltuk sayısını yazdırma
    count.innerText = selectedSeatCount;
    amount.innerText = (movie.value) * selectedSeatCount;

    saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));

    if (selectedSeats != null && selectedSeats.length > 0){
        seats.forEach(function(seats, index){
            if(selectedSeats.indexOf(index) >= 0){
                seats.classList.add('selected');
            }
        })  
    }

    if(selectedMovieIndex != null){
        movie.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(indexs){
    localStorage.setItem('selectedSeats', JSON.stringify(indexs))
    localStorage.setItem('selectedMovieIndex', movie.selectedIndex)
}
