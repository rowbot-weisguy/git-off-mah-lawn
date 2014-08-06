#pragma strict
public var raccoon: GameObject;
public var spawnerRate: float = 2;
private var nextSpawnerTime : float;
static var maxRaccoons : float;
static var minRaccoons : float;
static var numRaccoons : int = 0;
static var totalRaccoons : int;

function Start () {
	nextSpawnerTime = Time.time;
  	spawnerRate = 2;
  	maxRaccoons = Random.Range(10, 25);
  	minRaccoons = 0;
  	numRaccoons = 0;
  	totalRaccoons = maxRaccoons;
}

function Update () {
	addRaccoons();
	waveClean();
}

function addRaccoons() {
		 if (minRaccoons < maxRaccoons) {
			 if(Time.time > nextSpawnerTime && numRaccoons < 4){
    			var pos = Vector3( Random.Range(-2.6f, 2.6f) ,Random.Range(6.1f, 10f),0f);
    	 		var raccoonWave : GameObject = Instantiate (raccoon ,pos, Quaternion.identity);
    	 		var randomSize = Random.Range(0.6f, 1f);
    	 		raccoonWave.transform.localScale = Vector3(randomSize, randomSize, 0);
				addTimer();
    		 }
    	 }
}

function waveClean() {
	if (minRaccoons == maxRaccoons && numRaccoons == 0) {
	GameState.gameState = 2;
	}
}

function addTimer() {
	 nextSpawnerTime = Time.time + spawnerRate;
	 numRaccoons += 1;
	 minRaccoons += 1;
}

function OnGUI(){
	GUI.Label(Rect(20, 20, 1000, 500), "RACCOONS: " + totalRaccoons + "/" + maxRaccoons);
}