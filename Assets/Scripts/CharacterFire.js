#pragma strict

private var controller: CharacterController;
var defaultBullet : GameObject;
private var speed : float = 350;
var fireRate = 0.01;
var nextFire = 0.0;


function Start () {
	controller = GetComponent(CharacterController);
}

function Update () {
	if (Input.GetButton("Fire1") && Time.time > nextFire) {
		Fire();
	} else if (Input.GetKeyUp("space") && Time.time > nextFire) {
		Fire();
	}
}

function Fire() {
	nextFire = Time.time + fireRate;
	var spawn_defaultBullet = Instantiate(defaultBullet, transform.position, Quaternion.identity);
	spawn_defaultBullet.rigidbody.AddForce(Vector3.up * speed);
}
