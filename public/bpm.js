var beat = []
var lastBeat = new Date().getTime()
document.addEventListener('keydown',bpm)
function bpm(){
  var newBeat = new Date().getTime()
  var diff = parseInt(newBeat) - parseInt(lastBeat)
  lastBeat = newBeat
  if (5 < beat.length){
    beat.shift()
  }
  beat.push(diff)
  var sum = 0
  for (i=0;i<beat.length;i++){
    sum += parseInt(beat[i])
  }
  if (1 < beat.length) {
    var second = sum/beat.length/1000,
        minute = second*10/10,
        average = ~~(60/minute)

        var node = document.getElementById("bpm");
        node.innerHTML = average;



  }
}