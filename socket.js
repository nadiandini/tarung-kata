// const socket = io('https://tarung-kata-server-production.up.railway.app');
const socket = io('https://tarungkataserver-edikurniadidev.b4a.run');
socket.on('connection');

let AllRooms = [];
let createAccountState = true;
let myEnemy;
let myExEnemy;
let whoIsPlaying;
let username;


const shortSwalMessage = (title, timer = 2000) => {
	Swal.fire({
				title:title,
				showConfirmButton : false,
				timer: timer,
				allowEnterKey : true,
			});
}

const popUpJoinServer = async (titlePopUp) => {
	createAccountState = true;
	let  { value: serverName } = await Swal.fire({
								  title: titlePopUp,
								  input : 'text',
								  confirmButtonText: 'Masuk ke server',
								  focusConfirm: false,
								  allowEnterKey : true,
								  inputValidator : (value) => {
								  	if(AllRooms.includes(value)) {
								  		return 'nama server sudah dipakai!'
								  	}
								  }
								})
	if (serverName) {
		shortSwalMessage(`masuk ke server sebagai ${serverName}`);
		socket.emit('join', serverName);
		document.querySelector('#username').innerText = serverName;
		localStorage.username = serverName;
		username = serverName;
		createAccountState = false;
	}
}

username = localStorage.username;
if(username) {
	socket.emit('join', username);
	document.querySelector('#username').innerText = username;
	createAccountState = false;
} else {
	popUpJoinServer('Buat nama server')
};


const updateUserName = () => {
	socket.emit('delete room', document.querySelector('#username').innerText);
	popUpJoinServer('Update nama server')
};

const invite = (name) => {
	if(!myEnemy) {
		socket.emit("invite", {invited: name, inviter: document.querySelector('#username').innerText});
		Swal.fire({
					title:`menunggu konfirmasi ${name}`,
					showConfirmButton : false,
					allowEnterKey : true,
				});
	} else {
		shortSwalMessage(`kamu masih bertarung dengan ${myEnemy}`);
	}

}

const findEnemy = () => {
	username = document.querySelector('#username').innerText;
	let listEnemyHtml = AllRooms.map( name => {
							if(name !== username) {
								return `<div class="enemy-list-wrapper"><button class="enemy-list" onclick="invite('${name}')">${name}</button></div>`
							} 
						}).join('');

	Swal.fire({
	  title: 'cari lawan main',
	  html: listEnemyHtml,
	  showCloseButton: true,
	  showConfirmButton : false,
	})
}

socket.on('want to play?', (data) => {
	if(!myEnemy) {
		Swal.fire({
		  title: `${data.inviter} ngajak kamu main ni?`,
		  showDenyButton: true,
		  confirmButtonText: 'Oke',
		  denyButtonText: `Ndak Mau`,
		}).then((result) => {
		  if (result.isConfirmed) {
		    socket.emit('invitation-accapted', data)
		    myEnemy = data.inviter;
		    whoIsPlaying = data.inviter;
		    document.querySelector('.info-player').innerHTML = `<i class="fa fa-user-circle" aria-hidden="true"></i> Giliran ${whoIsPlaying.toUpperCase()}:`;
		  } else if (result.isDenied) {
		    socket.emit('invitation-rejected', data)
		  }
		})
	} else {
		socket.emit('invitation-rejected-because-playing-with-other', data);
	}
})

socket.on('invitation-accapted', (data) => {
	shortSwalMessage(`oke, silahkan mulai permainanya`)
	myEnemy = data.invited;
	whoIsPlaying = data.inviter;
	document.querySelector('.info-player').innerHTML = `<i class="fa fa-user-circle" aria-hidden="true"></i> Giliran ${whoIsPlaying.toUpperCase()}:`;
	initializeWord();

})

socket.on('invitation-rejected', (data) => {
	shortSwalMessage(`ajakanmu tidak diterima ${data.invited}`)
})

socket.on('invitation-rejected-because-playing-with-other', (data) => {
	shortSwalMessage(`${data.invited} lagi main dengan yang lain`)
})

socket.on('update room', (rooms) => {
	AllRooms = rooms.map(room => room.name);
})
