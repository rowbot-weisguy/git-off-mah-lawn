#pragma strict

private var movement : Vector3 = Vector3.zero;
private var controller: CharacterController;
private var speed : float = 5;
static var maxHealth : float = 10;
static var currentHealth : float = 10;
//private var nextFire = 0.0;
//private var bulletSpeed : float = 350;

//var defaultBullet : GameObject;
var anim : Animator;
var healthBarWidth : int;
var myHealthBarBackground : GameObject;
var myHealthBackground : GameObject;
var myHealthBar : GameObject;
var myHealth : GameObject;
var fireRate = 0.01;

static var inHouse : boolean;


function Start () {
	anim = GetComponent("Animator");
	controller = GetComponent(CharacterController);
	currentHealth = 10;
	
	healthBarWidth = 20;
	myHealth = Instantiate(myHealthBar, transform.position, transform.rotation);
	myHealthBackground = Instantiate(myHealthBarBackground, transform.position, transform.rotation);
	
	inHouse = false;
}

function Update () {
	RunAnimation();
	MovementControl();
	DisplayHealth();
}

function RunAnimation() {
	if (Input.GetKey(KeyCode.RightArrow)) {
		anim.SetFloat("HR", 1.0);
	} else if (Input.GetKeyUp(KeyCode.RightArrow)) {
		anim.SetFloat("HR", 0.0);
	}
		
	if (Input.GetKey(KeyCode.LeftArrow)) {
		anim.SetFloat("HL", 1.0);
	} else if (Input.GetKeyUp(KeyCode.LeftArrow)) {
		anim.SetFloat("HL", 0.0);
	}
	
	if (inHouse != true) {
		if (Input.GetKey(KeyCode.Space)) {
			anim.SetBool("Fire", true);
		} else if (Input.GetKeyUp(KeyCode.Space)) {
			anim.SetBool("Fire", false);
		}
	}

}

function MovementControl() {
	if (Input.acceleration.x) {
		movement = Vector3(Input.acceleration.x, 0, 0);
	} else {
		movement = Vector3(Input.GetAxis("Horizontal"), 0, 0);
	}
	movement = transform.TransformDirection(movement);
	movement *= speed;
	controller.Move(movement * Time.deltaTime); 

}

function getDamage(damage : int) {
	currentHealth -= damage;
	if (currentHealth <= 0) {
		currentHealth = 0;
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
	
	healthBarWidth = healthPercent * 40;
	
	if (currentHealth != maxHealth) {
		myHealthBackground.guiTexture.pixelInset = Rect(10, 10, 40, 8);
		myHealth.guiTexture.pixelInset = Rect(10, 10, healthBarWidth, 8);
	}
}

function OnTriggerEnter (col: Collider) {
	if (gameObject.tag == "Character") {
		if (col.gameObject.tag == "Enemy Bullet") {
			Destroy(col.gameObject);
			getDamage(1);
		}
	}
	
		if (gameObject.tag == "Character") {
			if (col.gameObject.tag == "House Border") {
			inHouse = true;
			}
		}
	}
