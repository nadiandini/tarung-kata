

let settingButton = document.querySelector('.fa-cog');
let closeSettingButton = document.querySelector('.close-setting-button');
let settingPage = document.querySelector('.setting-page');


settingButton.addEventListener('click', () => {
	settingPage.style.top = '0';
	// settingPage.style.left = '0';
	// settingPage.style.width = '100vw';
	// settingPage.style.height = '100vh';
	// settingPage.style.opacity = '100%';
	settingPage.style.visibility = 'visible';
})

closeSettingButton.addEventListener('click', () => {
	settingPage.style.visibility = 'hidden';
	settingPage.style.top = '-100vh';
	// settingPage.style.left = '0vw';
	// settingPage.style.width = '100vw';
	// settingPage.style.height = '100vh';
	// settingPage.style.opacity = '50%';
	
})

let askingButton = document.querySelector('.fa-info-circle');
let closeHowToPlayButton = document.querySelector('.close-how-to-play');
let howToPlayPage = document.querySelector('.how-to-play-page');

askingButton.addEventListener('click', () => {
	howToPlayPage.style.top = '0';
	howToPlayPage.style.visibility = 'visible';
})

closeHowToPlayButton.addEventListener('click', () => {
	howToPlayPage.style.top = '-100vh';
	howToPlayPage.style.visibility = 'hidden';
	
})


let statisticButton = document.querySelector('.fa-bar-chart');
let closeStatisticButton = document.querySelector('.close-statistic');
let statisticPage = document.querySelector('.statistic-page');

function goToStatistic() {
	statisticPage.style.top = '0';
	statisticPage.style.visibility = 'visible';
} 

statisticButton.addEventListener('click', () => {
	goToStatistic();
	// statisticPage.style.top = '0';
	// statisticPage.style.visibility = 'visible';
})

closeStatisticButton.addEventListener('click', () => {
	statisticPage.style.top = '-100vh';
	statisticPage.style.visibility = 'hidden';
	
})


Chart.register(ChartDataLabels);
Chart.defaults.color = 'black';

const labels = [1,2,3,4,5,6];

const data = {
  labels: labels,
  datasets: [{
    axis: 'y',
    label: 'Distribusi Jumlah Tebakan',
    data: localStorage.distributedGuest ? JSON.parse(localStorage.distributedGuest) : [0,0,0,0,0,0],
    fill: false,
    // base : 15;
    barThickness : 20,
    backgroundColor: [
      'rgba(54, 162, 235, 1)',
    ],
    borderColor: [
      'rgb(54, 162, 235)',
    ],
    borderWidth: 0
  }]
};


const config = {
  type: 'bar',
  data : data,
  options: {
    indexAxis: 'y',
    scales: {
        x: {
            grid: {
                display: false
               },
            ticks: {
            	display: false,
            	// font : {
            	// 	size : 50,	
            	//    }
            	},
            },
        y: {
            grid: {
                display: false
               }
            }
       },
    plugins: {
        legend: {
            display: false
        	},
        datalabels: {
            anchor: 'end',
            align: 'left',
            clip: true,
            // offset: 10,
            formatter: Math.round,
            color : 'white',
            font: {
                weight: 'bold',
                size: 16,
            	}
        	},
        tooltip: {
            enabled: false
        	}
    	}
  	}
};

let myChart = new Chart(document.getElementById('myChart'),config);


// if(!localStorage.nightMode) {
//     localStorage.setItem('nightMode', 'inactive')
// }

// function firstCheckNightMode(ev) {
//     if(localStorage.nightMode === 'active') {
//         ev.target.classList.add('.dark-theme')
//     }
// }




let mainBodyGame = document.querySelector('body');
let checkBoxNightMode = document.querySelector('.night-mode');
// let checkBoxHardMode = document.querySelector('.hard-mode');

function toggleNightMode() {
    if(checkBoxNightMode.checked) {
        mainBodyGame.classList.add('dark-theme');
        // localStorage.nightMode = 'active';
    } else {
        mainBodyGame.classList.remove('dark-theme');
        // localStorage.nightMode = 'inactive';
    }
}



let checkBoxTimer = document.querySelector('.timer');
let useTimer = true;
function toggleTimer() {
    if(checkBoxTimer.checked) {
        useTimer = true;
    } else {
        useTimer = false
    }
}

checkBoxNightMode.addEventListener('change', () => {
    toggleNightMode();
})


checkBoxTimer.addEventListener('change', () => {
    toggleTimer();
})

toggleTimer();
toggleNightMode();