#pragma strict

private var controller: CharacterController;
var defaultBullet : GameObject;
private var speed : float = 700;
static var fireTimer : float;

function Start () {
	controller = GetComponent(CharacterController);
	fireTimer = 15;
}

function Update () {
	Fire();
}

function Fire() {
	if (Input.GetKey(KeyCode.Space)) {
		fireTimer --;
		if (fireTimer <= 0) {
			var spawn_defaultBullet = Instantiate(defaultBullet, transform.position, Quaternion.identity);
			spawn_defaultBullet.rigidbody.AddForce(Vector3.up * speed);
			fireTimer = 15;
		}
	}else if (Input.GetKeyUp(KeyCode.Space)){
		fireTimer = 15;
	}
}
