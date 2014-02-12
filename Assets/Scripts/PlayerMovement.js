﻿//on ground movement variables
//Acceleration
private var acceleration : float;
var walkAcceleration : float = 5;
var runAcceleration : float = 10;
//Deceleration
var walkDeacceleration : float = 0;
var walkAccelAirRation : float = .25;
var walkDeaccelerationVolx : float;
private var walkDeaccelerationVolz : float;
//Objects
var cameraObject : GameObject;
var walkEffect : AudioClip;
//max speeds
private var maxSpeed : float;
var maxWalkSpeed : int = 20;
var maxRunSpeed : int = 40;

var horizontalMovement : Vector2;
//jumping variables
private var grounded : boolean = false;
var maxSlope : float = 90;
var jumpVelocity : float = 40;

function Update () 
{
	horizontalMovement = Vector2(rigidbody.velocity.x, rigidbody.velocity.z);
	//Enforces max walk speed
	if (horizontalMovement.magnitude > maxSpeed)
	{
		horizontalMovement = horizontalMovement.normalized;
		horizontalMovement *= maxSpeed;
	}
	rigidbody.velocity.x = horizontalMovement.x;
	rigidbody.velocity.z = horizontalMovement.y;
	
	//Deacceleration
	if (grounded)
	{
		rigidbody.velocity.x = Mathf.SmoothDamp(rigidbody.velocity.x, 0, walkDeaccelerationVolx, walkDeacceleration);
		rigidbody.velocity.z = Mathf.SmoothDamp(rigidbody.velocity.z, 0, walkDeaccelerationVolz, walkDeacceleration);
	}
	
	// z for y is intentional
	//Rotating with camera
	transform.rotation = Quaternion.Euler(0, cameraObject.GetComponent(MouseLook).currentyRotation, 0);
	//Adding walking force
	if (grounded)
		rigidbody.AddRelativeForce(Input.GetAxis("Horizontal") * walkAcceleration * Time.deltaTime, 0, Input.GetAxis("Vertical") * walkAcceleration * Time.deltaTime);
	else
		rigidbody.AddRelativeForce(Input.GetAxis("Horizontal") * walkAcceleration * walkAccelAirRation * Time.deltaTime, 0, Input.GetAxis("Vertical") * walkAcceleration * walkAccelAirRation * Time.deltaTime);
	//Running
	if (Input.GetButton ("Run") && grounded){
		maxSpeed = maxRunSpeed;
		walkAcceleration = runAcceleration;
	else
		maxSpeed = maxWalkSpeed
		
	}
		
	
	//Jumping
	if (Input.GetButtonDown("Jump") && grounded)
		rigidbody.AddForce(0, jumpVelocity, 0);
		
	//walking effect
	if (Input.GetKeyDown ("w") || Input.GetKeyDown ("s")||Input.GetKeyDown ("a")||Input.GetKeyDown ("d"))
		{
			audio.clip = walkEffect;
			audio.Play();
		}
	if (Input.GetKeyUp ("w") && !Input.GetKey ("s") && !Input.GetKey ("a") && !Input.GetKey ("d") ||Input.GetKey ("s")||Input.GetKeyUp ("a")||Input.GetKeyUp ("d"))
		{
			audio.clip = walkEffect;
			audio.Pause();
		}
}
//Grounded
function OnCollisionStay (collision : Collision)
{
	for (var contact : ContactPoint in collision.contacts)
	{
		if(Vector3.Angle(contact.normal, Vector3.up) < maxSlope)
			grounded = true;
	}
}

//setting grounded back to false
function OnCollisionExit ()
{
	grounded = false;
}
