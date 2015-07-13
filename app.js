var fs = require('fs');

function Employee(name, ext){
	return {
		name: name,
		ext: ext
	}
}
function Button(key, type, value, disabled){
	var hash = disabled ? '#' : '';
	return '#\n' +
	hash + 'expmod1 key' + key + ' type: ' + type + '\n' +
	hash + 'expmod1 key' + key + ' value: ' + value + '\n' +
	hash + 'expmod1 key' + key + ' line: 1\n'
}
function Park (key, ext, disabled){
	return Button(key, 'speeddial', '*' + ext, disabled);
}
function Pickup (key, ext, disabled){
	return Button(key, 'blf', ext, disabled);
}
function Extension(key, ext, disabled){
	return Button(key, 'blf', ext, disabled);
}

var employees = [
	//executives
	new Employee('Dave', 961),
	//community relations
	new Employee('Cindy', 963),
	new Employee('Kristin', 964),
	new Employee('Monica', 952),
	//sales
	new Employee('Garrett', 970),
	new Employee('Mel', 971),
	new Employee('Thresa', 950),
	new Employee('Debbie', 973),
	new Employee('Julee', 974),
	new Employee('Rachel', 960),
	new Employee('Tom', 951),
	//operations
	new Employee('Dylan', 966),
	new Employee('Michelle', 968),
	new Employee('Sam', 969),
	new Employee('Rachell', 972),
	new Employee('Suzy', 959),
	//support
	new Employee('Laurie', 962),
	new Employee('Lead Caller', 953),
	new Employee('Eric', 965),
	new Employee('Dave Hm', 967)
	];


	function Config(ext){
		this.ext = ext;
		this.buttons = Array(37);
	//parks
	this.buttons[1] = Park(1, 706);
	this.buttons[2] = Park(2, 707);
	this.buttons[3] = Park(3, 708);
	//pickups
	this.buttons[6] = Pickup(6, 706);
	this.buttons[7] = Pickup(7, 707);
	this.buttons[8] = Pickup(8, 708);

	//own number on bottom left
	this.buttons[18] = Extension(18, ext)

	//fill right side
	var emplIndex = 0;
	for (var i = 19; i < 37; i++){
		while (ext == employees[emplIndex].ext){
			emplIndex ++;
		}
		this.buttons[i] = Extension(i, employees[emplIndex].ext)
		emplIndex ++;
	}

	//extras up from bottom left
	var buttonIndex = 17;
	while(employees[emplIndex]){
		while (employees[emplIndex] && ext == employees[emplIndex].ext){
			emplIndex ++;
		}
		if (employees[emplIndex]){
			this.buttons[buttonIndex] = Extension(buttonIndex, employees[emplIndex].ext);
			buttonIndex = buttonIndex - 1;
			emplIndex ++;
		}
	}
}

Config.prototype.toString = function (){
	return this.fill().join('');
}

Config.prototype.fill = function (){
	var arr = [];
	for (var i = 1; i < 37; i++){
		arr.push(this.buttons[i] || Button(i, '', '', true))
	}
	return arr;
}


employees.forEach(function (e){
	var config = new Config(e.ext);
	fs.writeFileSync('output/' + e.ext + '.config', config.toString());
});