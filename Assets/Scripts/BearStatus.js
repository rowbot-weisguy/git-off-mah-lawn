#pragma strict


//	Raccoon has 3 states: moving, pausing and recovering
//  Raccoon can move in 3 directions: down, down-left, and down-right

	public var maxHealth : float = 20;
	public var currentHealth : float = 20;
	static var speed_x : float = 0.025;
	static var speed_y : float = 0.015;
	
	var healthBarWidth : int;
	var myHealthBarBackground : GameObject;
	var myHealthBackground : GameObject;
	var myHealthBar : GameObject;
	var myHealth : GameObject;
	
	var minMove : float = 1.0;
	var maxMove : float = 5.0;
	var minPause : float = 1.0;
	var maxPause : float = 3.0;
	
	var currentAction: String = 'move';
	var currentActionTimer : float = 0.0;
	
	var moveDirection: String = 'down';
	
	private var timer : int = 100;
	var enemy_bullet : GameObject;
	private var attack_speed : float = 300;
	
	var anim : Animator;
	var raccoon_losing : boolean = false;
	
	public var smallBlood : GameObject;
	public var explosion : GameObject;
	public var bigBlood : GameObject;
	
	public var blood : AudioClip;
	
	
	

function Start () {
	currentHealth = maxHealth; // Set starting health
	ChooseDirection(); 
	anim = GetComponent("Animator");
	
	raccoon_losing = false;
	GameState.gameState = 1;
	
	healthBarWidth = 40;

	myHealth = Instantiate(myHealthBar, transform.position, transform.rotation);
	myHealthBackground = Instantiate(myHealthBarBackground, transform.position, transform.rotation);
	
}

function Update () {
	DisplayHealth();
	// Check if Raccoon is moving, pausing or recovering and then calls that action
	if (GameState.gameState == 1) {
	switch(currentAction) {
		case 'move': Move(); break;
		case 'pause': Pause(); break;
		case 'recover': Recover(); break;
		}
	}
}

function ChooseDirection() {

	// First, we'll do the actual direction choosing
	var r = Random.Range(0,2.999); // Get a random number within range
	r = Mathf.Floor(r); // Rounds to lowest whole integer
	
	switch(r) { // Checks which one it is and executes outcome
		case 0:
			moveDirection = 'down';
				anim.SetFloat("RacoonSpeed", 1.0);
			break;
		case 1:
			moveDirection = 'downleft';
				anim.SetFloat("RacoonSpeed", 1.0);
			break;
		case 2:
			moveDirection = 'downright';
				anim.SetFloat("RacoonSpeed", 1.0);
			break;
		default:
			moveDirection = 'down';
				anim.SetFloat("RacoonSpeed", 1.0);
			break;
	}
	
	// And lastly, we'll set the state and how long we want to go for
	currentAction = 'move';
	currentActionTimer = Time.time + Random.Range(minMove,maxMove);
}

function Move() {
	// Check and call the relevant movement direction
	switch(moveDirection) {
		case 'down':
			MoveDown();
			break;
		case 'downleft':
			MoveDownLeft();
			break;
		case 'downright':
			MoveDownRight();
			break;
		default:
			MoveDown();
			break;
	}
	// If the timer's up, pause
	if (Time.time > currentActionTimer) {
		currentActionTimer = Time.time + Random.Range(minPause,maxPause);
		currentAction = 'pause';
	}
}

function MoveDown() {
	transform.position.y -= speed_y;
}

function MoveDownLeft() {
	transform.position.x -= 0.66*speed_x;
	transform.position.y -= 0.66*speed_y;
}

function MoveDownRight() {
	transform.position.x += 0.66*speed_x;
	transform.position.y -= 0.66*speed_y;
}

//	var raccoons = GameObject.FindGameObjectsWithTag("Raccoon");
//	for (var entity in raccoons) {
//		entity.transform.position.y -= speed_y;
//	}


function Pause() {
	anim.SetFloat("RacoonSpeed", 0.0);
	
	if (Time.time > currentActionTimer) {
		ChooseDirection();
	}
}

function Recover() {
	// NEED TO: Set animation to Recovery
	
	if (Time.time > currentActionTimer) {
		ChooseDirection();
	}
}

function takeDamage(damage : int) {
	currentHealth -= damage;
	if (currentHealth <= 0) {
		currentHealth = 0;

	}
	
	if (this.currentHealth <= 0) {
		Destroy(this.gameObject);
		Destroy (myHealth);
		Destroy (myHealthBackground);
		var shockWave : GameObject = Instantiate(explosion,transform.position,Quaternion.identity);
		shockWave.transform.localScale = Vector3(0.0001f, 0.0001f, 0.0001f);
		Instantiate(bigBlood,transform.position,Quaternion.identity);
		Spawner.numRaccoons -= 1;
		Spawner.totalRaccoons -= 1;
		


	}
}

function DisplayHealth() {
	myHealth.transform.position = Camera.main.WorldToViewportPoint(transform.position);
	myHealth.transform.position.x -= 0.085f;
	myHealth.transform.position.y -= 0.06f;
	myHealth.transform.localScale = Vector3.zero;
	
	myHealthBackground.transform.position = Camera.main.WorldToViewportPoint(transform.position);
	myHealthBackground.transform.position.x -= 0.085f;
	myHealthBackground.transform.position.y -= 0.06f;
	myHealthBackground.transform.localScale = Vector3.zero;
	
	var healthPercent : float = currentHealth / maxHealth;
	
	if (healthPercent < 0) {
		healthPercent = 0;
	} else if (healthPercent > 100) {
		healthPercent = 100;
	}
	
	var healthBackgroundWidth : int = 40;
	
	print(healthBackgroundWidth);
	
	healthBarWidth = healthPercent * healthBackgroundWidth;
	
	if (currentHealth != maxHealth) {
		myHealthBackground.guiTexture.pixelInset = Rect(10, 10, healthBackgroundWidth, 8);
		myHealth.guiTexture.pixelInset = Rect(10, 10, healthBarWidth, 8);
	}

}

function OnTriggerEnter(col : Collider) {
	if (col.gameObject.name == "BorderL") {
		moveDirection = 'downright';
		MoveDownRight();
	} else if (col.gameObject.name == "BorderR") {
		moveDirection = 'downleft';
		MoveDownLeft();
	}
		
	if (col.gameObject.tag == "Default Bullet") {
		takeDamage(1);
		Destroy(col.gameObject);
		Instantiate(smallBlood,col.transform.position,Quaternion.identity);
		audio.PlayOneShot(blood);

	}
	
	if (col.gameObject.tag == "Porch") {
		raccoon_losing = true;
		GameState.gameState = 3;
	}
}
