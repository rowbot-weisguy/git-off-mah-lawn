#pragma strict
public var enemy: GameObject;
public var bossEnemy: GameObject;
public var spawnerRate: float = 2;
private var nextSpawnerTime : float;
static var maxRaccoons : float;
static var minRaccoons : float;
static var numRaccoons : int = 0;
static var totalRaccoons : int;
static var addBoss : boolean;
private var numBoss : int;

function Start () {
	nextSpawnerTime = Time.time;
  	spawnerRate = 2;
  	maxRaccoons = Random.Range(4, 4);
  	minRaccoons = 0;
  	numRaccoons = 0;
  	totalRaccoons = maxRaccoons;
  	addBoss = false;
  	numBoss = 0;
}

function Update () {
	addRaccoons();
	waveClean();
	addBossMonster();
}

function addRaccoons() {
		 if (minRaccoons < maxRaccoons) {
			 if(Time.time > nextSpawnerTime && numRaccoons < 4){
    			var pos = Vector3( Random.Range(-2.6f, 2.6f) ,Random.Range(6.1f, 10f),0f);
    	 		var raccoonWave : GameObject = Instantiate (enemy ,pos, Quaternion.identity);
    	 		var randomSize = Random.Range(0.6f, 1f);
    	 		raccoonWave.transform.localScale = Vector3(randomSize, randomSize, 0);
				addTimer();
    		 }
    	 }
 
}

function addBossMonster() {
		if (addBoss == true) {
			numBoss ++;
				if (numBoss == 1) {
    			var bossPos = Vector3( Random.Range(-2.6f, 2.6f) ,Random.Range(6.1f, 8f),0f);
    			var boss : GameObject = Instantiate (bossEnemy ,bossPos, Quaternion.identity);
    			var randomSize = Random.Range(3f, 3f);
    			boss.transform.localScale = Vector3(randomSize, randomSize, 0);
    			numBoss = 2;
    			}
    	}
}

function waveClean() {
	if (minRaccoons == maxRaccoons && numRaccoons == 0) {
	addBoss = true;
	}
}

function addTimer() {
	 nextSpawnerTime = Time.time + spawnerRate;
	 numRaccoons += 1;
	 minRaccoons += 1;
}

function OnGUI(){
	if (addBoss == false) {
		GUI.Label(Rect(20, 20, 1000, 500), "RACCOONS: " + totalRaccoons + "/" + maxRaccoons);
	}
	
}