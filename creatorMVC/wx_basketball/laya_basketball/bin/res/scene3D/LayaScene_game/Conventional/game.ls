{
	"version":"LAYASCENE3D:01",
	"data":{
		"type":"Scene3D",
		"props":{
			"name":"game",
			"ambientColor":[
				0.212,
				0.227,
				0.259
			],
			"lightmaps":[],
			"enableFog":false,
			"fogStart":0,
			"fogRange":300,
			"fogColor":[
				0.5,
				0.5,
				0.5
			]
		},
		"child":[
			{
				"type":"Camera",
				"props":{
					"name":"Main Camera",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						1.3,
						7
					],
					"rotation":[
						0,
						0.9953963,
						0.09584571,
						0
					],
					"scale":[
						1,
						1,
						1
					],
					"clearFlag":1,
					"orthographic":false,
					"fieldOfView":60,
					"nearPlane":0.3,
					"farPlane":1000,
					"viewport":[
						0,
						0,
						1,
						1
					],
					"clearColor":[
						0.1921569,
						0.3019608,
						0.4745098,
						0
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"DirectionLight",
				"props":{
					"name":"Directional Light",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						3,
						0
					],
					"rotation":[
						0.1093816,
						0.8754261,
						0.4082179,
						-0.2345697
					],
					"scale":[
						1,
						1,
						1
					],
					"intensity":1,
					"lightmapBakedType":0,
					"color":[
						1,
						0.9568627,
						0.8392157
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"props":{
					"name":"ground",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						0,
						0
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						1.5,
						1,
						2.8
					],
					"meshPath":"Library/unity default resources-Plane.lm",
					"enableRender":true,
					"materials":[
						{
							"path":"Assets/res/Materials/plane.lmat"
						}
					]
				},
				"components":[
					{
						"type":"PhysicsCollider",
						"restitution":0.9,
						"friction":0.5,
						"rollingFriction":0,
						"shapes":[
							{
								"type":"BoxColliderShape",
								"center":[
									0,
									-0.25,
									0
								],
								"size":[
									10,
									0.5,
									9.999999
								]
							}
						],
						"isTrigger":false
					}
				],
				"child":[]
			},
			{
				"type":"Sprite3D",
				"props":{
					"name":"GoalPrefab",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						1.15,
						10.27
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						0.1,
						0.1,
						0.1
					]
				},
				"components":[],
				"child":[
					{
						"type":"MeshSprite3D",
						"props":{
							"name":"GoalBase",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								-1.355736E-05,
								-10.93333,
								4.000012
							],
							"rotation":[
								-1.938831E-07,
								7.213121E-07,
								-2.541967E-06,
								-1
							],
							"scale":[
								6,
								1,
								6
							],
							"meshPath":"Library/unity default resources-Cube.lm",
							"enableRender":true,
							"materials":[
								{
									"path":"Assets/res/phy_scene/Materials/GoalBaseMaterial.lmat"
								}
							]
						},
						"components":[
							{
								"type":"PhysicsCollider",
								"restitution":0.9,
								"friction":0.5,
								"rollingFriction":0,
								"shapes":[
									{
										"type":"BoxColliderShape",
										"center":[
											0,
											0,
											0
										],
										"size":[
											1,
											1,
											1
										]
									}
								],
								"isTrigger":false
							}
						],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"props":{
							"name":"GoalMat",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								-0.0002760914,
								-7.437222,
								4.29086
							],
							"rotation":[
								-8.844977E-06,
								1.417614E-06,
								-3.373394E-05,
								-1
							],
							"scale":[
								1.190476,
								3,
								1.190476
							],
							"meshPath":"Library/unity default resources-Cylinder.lm",
							"enableRender":true,
							"materials":[
								{
									"path":"Assets/res/phy_scene/Materials/GoalMatMaterial.lmat"
								}
							]
						},
						"components":[
							{
								"type":"PhysicsCollider",
								"restitution":0,
								"friction":0.5,
								"rollingFriction":0,
								"shapes":[
									{
										"type":"CapsuleColliderShape",
										"center":[
											5.960464E-08,
											4.768372E-07,
											-8.940696E-08
										],
										"radius":0.5000001,
										"height":2
									}
								],
								"isTrigger":false
							}
						],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"props":{
							"name":"GoalPost2",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								-0.003215743,
								-1.927376,
								4.256763
							],
							"rotation":[
								0.0001166924,
								2.438111E-05,
								-0.0002669758,
								-1
							],
							"scale":[
								0.8,
								2.6,
								0.8
							],
							"meshPath":"Library/unity default resources-Cylinder.lm",
							"enableRender":true,
							"materials":[
								{
									"path":"Assets/res/phy_scene/Materials/GoalPostMaterial.lmat"
								}
							]
						},
						"components":[
							{
								"type":"PhysicsCollider",
								"restitution":0,
								"friction":0.5,
								"rollingFriction":0,
								"shapes":[
									{
										"type":"CapsuleColliderShape",
										"center":[
											0,
											0,
											0
										],
										"radius":0.5,
										"height":2
									}
								],
								"isTrigger":false
							}
						],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"props":{
							"name":"GoalPost1",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								-0.004758234,
								1.027264,
								3.534781
							],
							"rotation":[
								-0.7070243,
								-0.0001715405,
								-0.0002060205,
								-0.7071893
							],
							"scale":[
								0.7,
								3,
								0.7
							],
							"meshPath":"Library/unity default resources-Cube.lm",
							"enableRender":true,
							"materials":[
								{
									"path":"Assets/res/phy_scene/Materials/GoalPostMaterial.lmat"
								}
							]
						},
						"components":[
							{
								"type":"PhysicsCollider",
								"restitution":0,
								"friction":0.5,
								"rollingFriction":0,
								"shapes":[
									{
										"type":"BoxColliderShape",
										"center":[
											0,
											0,
											-9.536743E-07
										],
										"size":[
											0.9999999,
											0.9999998,
											0.9999998
										]
									}
								],
								"isTrigger":false
							}
						],
						"child":[]
					},
					{
						"type":"Sprite3D",
						"props":{
							"name":"GoalBoard",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								-0.005335991,
								3.056196,
								1.94828
							],
							"rotation":[
								-9.259554E-05,
								0.0003518115,
								1,
								-0.0001851537
							],
							"scale":[
								9,
								6,
								0.1
							]
						},
						"components":[
							{
								"type":"PhysicsCollider",
								"restitution":0.6,
								"friction":0.5,
								"rollingFriction":0,
								"shapes":[
									{
										"type":"BoxColliderShape",
										"center":[
											0,
											0,
											0
										],
										"size":[
											1,
											1,
											1
										]
									}
								],
								"isTrigger":false
							}
						],
						"child":[
							{
								"type":"MeshSprite3D",
								"props":{
									"name":"QuadFront",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										0,
										0,
										-0.5
									],
									"rotation":[
										0,
										0,
										0,
										-1
									],
									"scale":[
										1,
										-1,
										1
									],
									"meshPath":"Library/unity default resources-Quad.lm",
									"enableRender":true,
									"materials":[
										{
											"path":"Assets/res/phy_scene/Materials/GoalBoardMaterial.lmat"
										}
									]
								},
								"components":[],
								"child":[]
							},
							{
								"type":"MeshSprite3D",
								"props":{
									"name":"QuadBack",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										0,
										0,
										0.5
									],
									"rotation":[
										0,
										0,
										0,
										-1
									],
									"scale":[
										1,
										-1,
										-1
									],
									"meshPath":"Library/unity default resources-Quad.lm",
									"enableRender":true,
									"materials":[
										{
											"path":"Assets/res/phy_scene/Materials/GoalBoardMaterial.lmat"
										}
									]
								},
								"components":[],
								"child":[]
							},
							{
								"type":"MeshSprite3D",
								"props":{
									"name":"ForShadow",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										-0.47,
										0,
										0
									],
									"rotation":[
										0,
										0,
										0,
										-1
									],
									"scale":[
										0.04,
										1,
										1
									],
									"meshPath":"Library/unity default resources-Cube.lm",
									"enableRender":true,
									"materials":[
										{
											"type":"Laya.BlinnPhongMaterial",
											"path":"Resources/unity_builtin_extra.lmat"
										}
									]
								},
								"components":[],
								"child":[]
							},
							{
								"type":"MeshSprite3D",
								"props":{
									"name":"ForShadow",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										0.47,
										0,
										0
									],
									"rotation":[
										0,
										0,
										0,
										-1
									],
									"scale":[
										0.04,
										1,
										1
									],
									"meshPath":"Library/unity default resources-Cube.lm",
									"enableRender":true,
									"materials":[
										{
											"type":"Laya.BlinnPhongMaterial",
											"path":"Resources/unity_builtin_extra.lmat"
										}
									]
								},
								"components":[],
								"child":[]
							},
							{
								"type":"MeshSprite3D",
								"props":{
									"name":"ForShadow",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										0,
										-0.47,
										0
									],
									"rotation":[
										0,
										0,
										0,
										-1
									],
									"scale":[
										0.9,
										0.06,
										1
									],
									"meshPath":"Library/unity default resources-Cube.lm",
									"enableRender":true,
									"materials":[
										{
											"type":"Laya.BlinnPhongMaterial",
											"path":"Resources/unity_builtin_extra.lmat"
										}
									]
								},
								"components":[],
								"child":[]
							},
							{
								"type":"MeshSprite3D",
								"props":{
									"name":"ForShadow",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										0,
										0.47,
										0
									],
									"rotation":[
										0,
										0,
										0,
										-1
									],
									"scale":[
										0.9,
										0.06,
										1
									],
									"meshPath":"Library/unity default resources-Cube.lm",
									"enableRender":true,
									"materials":[
										{
											"type":"Laya.BlinnPhongMaterial",
											"path":"Resources/unity_builtin_extra.lmat"
										}
									]
								},
								"components":[],
								"child":[]
							},
							{
								"type":"MeshSprite3D",
								"props":{
									"name":"ForShadow",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										-0.15,
										0.1,
										0
									],
									"rotation":[
										0,
										0,
										0,
										-1
									],
									"scale":[
										0.04,
										0.35,
										1
									],
									"meshPath":"Library/unity default resources-Cube.lm",
									"enableRender":true,
									"materials":[
										{
											"type":"Laya.BlinnPhongMaterial",
											"path":"Resources/unity_builtin_extra.lmat"
										}
									]
								},
								"components":[],
								"child":[]
							},
							{
								"type":"MeshSprite3D",
								"props":{
									"name":"ForShadow",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										0.15,
										0.1,
										0
									],
									"rotation":[
										0,
										0,
										0,
										-1
									],
									"scale":[
										0.04,
										0.35,
										1
									],
									"meshPath":"Library/unity default resources-Cube.lm",
									"enableRender":true,
									"materials":[
										{
											"type":"Laya.BlinnPhongMaterial",
											"path":"Resources/unity_builtin_extra.lmat"
										}
									]
								},
								"components":[],
								"child":[]
							},
							{
								"type":"MeshSprite3D",
								"props":{
									"name":"ForShadow",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										0,
										-0.05,
										0
									],
									"rotation":[
										0,
										0,
										0,
										-1
									],
									"scale":[
										0.3,
										0.06,
										1
									],
									"meshPath":"Library/unity default resources-Cube.lm",
									"enableRender":true,
									"materials":[
										{
											"type":"Laya.BlinnPhongMaterial",
											"path":"Resources/unity_builtin_extra.lmat"
										}
									]
								},
								"components":[],
								"child":[]
							},
							{
								"type":"MeshSprite3D",
								"props":{
									"name":"ForShadow",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										0,
										0.25,
										0
									],
									"rotation":[
										0,
										0,
										0,
										-1
									],
									"scale":[
										0.3,
										0.06,
										1
									],
									"meshPath":"Library/unity default resources-Cube.lm",
									"enableRender":true,
									"materials":[
										{
											"type":"Laya.BlinnPhongMaterial",
											"path":"Resources/unity_builtin_extra.lmat"
										}
									]
								},
								"components":[],
								"child":[]
							}
						]
					},
					{
						"type":"MeshSprite3D",
						"props":{
							"name":"GoalHolder",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								0.09738894,
								-2.455699,
								-1.737823
							],
							"rotation":[
								0.0003518164,
								9.259547E-05,
								-0.0001853167,
								-1
							],
							"scale":[
								1.4,
								1.4,
								1.4
							],
							"meshPath":"Assets/res/Models/GoalHoop-holder_1__1.lm",
							"enableRender":true,
							"materials":[
								{
									"path":"Assets/res/phy_scene/Materials/GoalHoopMaterial.lmat"
								}
							]
						},
						"components":[
							{
								"type":"PhysicsCollider",
								"restitution":0,
								"friction":0.5,
								"rollingFriction":0,
								"shapes":[
									{
										"type":"BoxColliderShape",
										"center":[
											-0.08803135,
											2.83,
											2.349883
										],
										"size":[
											0.8709376,
											0.1,
											0.4974809
										]
									},
									{
										"type":"BoxColliderShape",
										"center":[
											-0.08803135,
											2.6,
											2.55
										],
										"size":[
											0.8709376,
											0.3,
											0.1
										]
									},
									{
										"type":"BoxColliderShape",
										"center":[
											-0.08803135,
											2.9,
											2.45
										],
										"size":[
											0.3,
											0.02,
											0.2
										]
									}
								],
								"isTrigger":false
							}
						],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"props":{
							"name":"GoalHoop",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								0.09685123,
								-2.51103,
								-1.758478
							],
							"rotation":[
								0.0006649805,
								2.30452E-05,
								-0.000171741,
								-0.9999998
							],
							"scale":[
								1.4,
								1.4,
								1.4
							],
							"meshPath":"Assets/res/Models/GoalHoop-Basketball_1_43.lm",
							"enableRender":true,
							"materials":[
								{
									"path":"Assets/res/phy_scene/Materials/GoalHoopMaterial.lmat"
								}
							]
						},
						"components":[
							{
								"type":"PhysicsCollider",
								"restitution":0,
								"friction":0.5,
								"rollingFriction":0,
								"shapes":[
									{
										"type":"BoxColliderShape",
										"center":[
											-0.08801508,
											2.15,
											2.54
										],
										"size":[
											1,
											0.3,
											0.1
										]
									},
									{
										"type":"SphereColliderShape",
										"center":[
											-0.088,
											2.874,
											2.155
										],
										"radius":0.042
									},
									{
										"type":"SphereColliderShape",
										"center":[
											-0.611,
											2.874,
											2.014863
										],
										"radius":0.042
									},
									{
										"type":"SphereColliderShape",
										"center":[
											-0.9938626,
											2.874,
											1.632
										],
										"radius":0.042
									},
									{
										"type":"SphereColliderShape",
										"center":[
											-1.134,
											2.874,
											1.109
										],
										"radius":0.042
									},
									{
										"type":"SphereColliderShape",
										"center":[
											-0.9938626,
											2.874,
											0.5859999
										],
										"radius":0.042
									},
									{
										"type":"SphereColliderShape",
										"center":[
											-0.6110001,
											2.874,
											0.2031374
										],
										"radius":0.042
									},
									{
										"type":"SphereColliderShape",
										"center":[
											-0.08799991,
											2.874,
											0.06299996
										],
										"radius":0.042
									},
									{
										"type":"SphereColliderShape",
										"center":[
											0.4350002,
											2.874,
											0.2031375
										],
										"radius":0.042
									},
									{
										"type":"SphereColliderShape",
										"center":[
											0.8178626,
											2.874,
											0.5860001
										],
										"radius":0.042
									},
									{
										"type":"SphereColliderShape",
										"center":[
											0.958,
											2.874,
											1.109
										],
										"radius":0.042
									},
									{
										"type":"SphereColliderShape",
										"center":[
											0.8178626,
											2.874,
											1.632
										],
										"radius":0.042
									},
									{
										"type":"SphereColliderShape",
										"center":[
											0.4349998,
											2.874,
											2.014863
										],
										"radius":0.042
									}
								],
								"isTrigger":false
							}
						],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"props":{
							"name":"GoalNet",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								0.09628638,
								-0.8660347,
								-1.762765
							],
							"rotation":[
								0.0006649922,
								2.30452E-05,
								-0.000171741,
								-0.9999998
							],
							"scale":[
								1.4,
								0.8000001,
								1.4
							],
							"meshPath":"Assets/res/Models/Goal-Basketball_1_43.lm",
							"enableRender":true,
							"materials":[
								{
									"path":"Assets/res/phy_scene/Materials/GoalNetMaterial.lmat"
								}
							]
						},
						"components":[
							{
								"type":"PhysicsCollider",
								"restitution":0,
								"friction":0.5,
								"rollingFriction":0,
								"shapes":[
									{
										"type":"BoxColliderShape",
										"center":[
											-0.1,
											2.2,
											0.2
										],
										"size":[
											1.6,
											1,
											0.01
										]
									},
									{
										"type":"BoxColliderShape",
										"center":[
											-0.1,
											2.2,
											2.1
										],
										"size":[
											1.6,
											1,
											0.01
										]
									},
									{
										"type":"BoxColliderShape",
										"center":[
											0.8,
											2.2,
											1.1
										],
										"size":[
											0.01,
											1,
											1.6
										]
									},
									{
										"type":"BoxColliderShape",
										"center":[
											-1,
											2.2,
											1.1
										],
										"size":[
											0.01,
											1,
											1.6
										]
									},
									{
										"type":"BoxColliderShape",
										"center":[
											-0.1,
											1,
											0.35
										],
										"size":[
											1.4,
											1,
											0.01
										]
									},
									{
										"type":"BoxColliderShape",
										"center":[
											-0.1,
											1,
											2
										],
										"size":[
											1.4,
											1,
											0.01
										]
									},
									{
										"type":"BoxColliderShape",
										"center":[
											0.73,
											1,
											1.1
										],
										"size":[
											0.01,
											1,
											1.2
										]
									},
									{
										"type":"BoxColliderShape",
										"center":[
											-0.92,
											1,
											1.1
										],
										"size":[
											0.01,
											1,
											1.2
										]
									}
								],
								"isTrigger":false
							}
						],
						"child":[]
					}
				]
			},
			{
				"type":"Sprite3D",
				"props":{
					"name":"ball_trigger",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						1.153,
						10.254
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						1,
						1,
						1
					]
				},
				"components":[
					{
						"type":"PhysicsCollider",
						"restitution":0,
						"friction":0.5,
						"rollingFriction":0,
						"shapes":[
							{
								"type":"SphereColliderShape",
								"center":[
									0,
									0,
									0
								],
								"radius":0.06
							}
						],
						"isTrigger":true
					}
				],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"props":{
					"name":"ball",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						0.81,
						7.715
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						0.2,
						0.2,
						0.2
					],
					"meshPath":"Library/unity default resources-Sphere.lm",
					"enableRender":true,
					"materials":[
						{
							"path":"Assets/res/Materials/basketball.lmat"
						}
					]
				},
				"components":[
					{
						"type":"Rigidbody3D",
						"mass":1,
						"isKinematic":false,
						"restitution":0.9,
						"friction":0.5,
						"rollingFriction":0,
						"linearDamping":0,
						"angularDamping":0,
						"overrideGravity":false,
						"gravity":[
							0,
							0,
							0
						],
						"shapes":[
							{
								"type":"SphereColliderShape",
								"center":[
									0,
									0,
									0
								],
								"radius":0.5
							}
						],
						"isTrigger":false
					}
				],
				"child":[]
			},
			{
				"type":"ShuriKenParticle3D",
				"props":{
					"name":"Particle",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						0.759,
						10.246
					],
					"rotation":[
						0.7071068,
						0,
						0,
						-0.7071068
					],
					"scale":[
						1,
						1,
						1
					],
					"isPerformanceMode":true,
					"duration":2,
					"looping":false,
					"prewarm":false,
					"startDelayType":0,
					"startDelay":0,
					"startDelayMin":0,
					"startDelayMax":0,
					"startLifetimeType":2,
					"startLifetimeConstant":0.6,
					"startLifetimeConstantMin":0.3,
					"startLifetimeConstantMax":0.6,
					"startLifetimeGradient":{
						"startLifetimes":[]
					},
					"startLifetimeGradientMin":{
						"startLifetimes":[]
					},
					"startLifetimeGradientMax":{
						"startLifetimes":[]
					},
					"startSpeedType":0,
					"startSpeedConstant":5,
					"startSpeedConstantMin":0,
					"startSpeedConstantMax":5,
					"threeDStartSize":false,
					"startSizeType":2,
					"startSizeConstant":0.35,
					"startSizeConstantMin":0.2,
					"startSizeConstantMax":0.35,
					"startSizeConstantSeparate":[
						0.35,
						1,
						1
					],
					"startSizeConstantMinSeparate":[
						0.2,
						1,
						1
					],
					"startSizeConstantMaxSeparate":[
						0.35,
						1,
						1
					],
					"threeDStartRotation":false,
					"startRotationType":2,
					"startRotationConstant":360,
					"startRotationConstantMin":0,
					"startRotationConstantMax":360,
					"startRotationConstantSeparate":[
						0,
						0,
						-360
					],
					"startRotationConstantMinSeparate":[
						0,
						0,
						0
					],
					"startRotationConstantMaxSeparate":[
						0,
						0,
						-360
					],
					"randomizeRotationDirection":0,
					"startColorType":2,
					"startColorConstant":[
						0.654902,
						0,
						1,
						1
					],
					"startColorConstantMin":[
						0.427451,
						1,
						0,
						1
					],
					"startColorConstantMax":[
						0.654902,
						0,
						1,
						1
					],
					"gravity":[
						0,
						-9.81,
						0
					],
					"gravityModifier":-0.3,
					"simulationSpace":0,
					"scaleMode":2,
					"playOnAwake":true,
					"maxParticles":100,
					"autoRandomSeed":true,
					"randomSeed":7.124529E+08,
					"emission":{
						"enable":true,
						"emissionRate":0,
						"emissionRateTip":"Time",
						"bursts":[
							{
								"time":0,
								"min":30,
								"max":30
							}
						]
					},
					"shape":{
						"enable":true,
						"shapeType":1,
						"sphereRadius":1,
						"sphereEmitFromShell":false,
						"sphereRandomDirection":0,
						"hemiSphereRadius":1,
						"hemiSphereEmitFromShell":false,
						"hemiSphereRandomDirection":0,
						"coneAngle":25,
						"coneRadius":1,
						"coneLength":5,
						"coneEmitType":1,
						"coneRandomDirection":0,
						"boxX":1,
						"boxY":1,
						"boxZ":1,
						"boxRandomDirection":0,
						"circleRadius":1,
						"circleArc":360,
						"circleEmitFromEdge":false,
						"circleRandomDirection":0
					},
					"colorOverLifetime":{
						"enable":true,
						"color":{
							"type":1,
							"constant":[
								0,
								0,
								0,
								0
							],
							"gradient":{
								"alphas":[
									{
										"key":0,
										"value":1
									},
									{
										"key":0.6470588,
										"value":1
									},
									{
										"key":1,
										"value":0
									}
								],
								"rgbs":[
									{
										"key":0,
										"value":[
											1,
											1,
											1
										]
									},
									{
										"key":1,
										"value":[
											1,
											1,
											1
										]
									}
								]
							},
							"constantMin":[
								0,
								0,
								0,
								0
							],
							"constantMax":[
								0,
								0,
								0,
								0
							],
							"gradientMax":{
								"alphas":[
									{
										"key":0,
										"value":1
									},
									{
										"key":0.6470588,
										"value":1
									},
									{
										"key":1,
										"value":0
									}
								],
								"rgbs":[
									{
										"key":0,
										"value":[
											1,
											1,
											1
										]
									},
									{
										"key":1,
										"value":[
											1,
											1,
											1
										]
									}
								]
							}
						}
					},
					"sizeOverLifetime":{
						"enable":true,
						"size":{
							"type":0,
							"separateAxes":false,
							"gradient":{
								"sizes":[
									{
										"key":0,
										"value":0
									},
									{
										"key":1,
										"value":1
									}
								]
							},
							"gradientX":{
								"sizes":[
									{
										"key":0,
										"value":0
									},
									{
										"key":1,
										"value":1
									}
								]
							},
							"gradientY":{
								"sizes":[
									{
										"key":0,
										"value":0
									},
									{
										"key":1,
										"value":1
									}
								]
							},
							"gradientZ":{
								"sizes":[
									{
										"key":0,
										"value":0
									},
									{
										"key":1,
										"value":1
									}
								]
							},
							"constantMin":0,
							"constantMax":0,
							"constantMinSeparate":[
								0,
								0,
								0
							],
							"constantMaxSeparate":[
								0,
								0,
								0
							],
							"gradientMin":{
								"sizes":[]
							},
							"gradientMax":{
								"sizes":[
									{
										"key":0,
										"value":0
									},
									{
										"key":1,
										"value":1
									}
								]
							},
							"gradientXMin":{
								"sizes":[]
							},
							"gradientXMax":{
								"sizes":[
									{
										"key":0,
										"value":0
									},
									{
										"key":1,
										"value":1
									}
								]
							},
							"gradientYMin":{
								"sizes":[]
							},
							"gradientYMax":{
								"sizes":[
									{
										"key":0,
										"value":0
									},
									{
										"key":1,
										"value":1
									}
								]
							},
							"gradientZMin":{
								"sizes":[]
							},
							"gradientZMax":{
								"sizes":[
									{
										"key":0,
										"value":0
									},
									{
										"key":1,
										"value":1
									}
								]
							}
						}
					},
					"renderMode":0,
					"stretchedBillboardCameraSpeedScale":0,
					"stretchedBillboardSpeedScale":0,
					"stretchedBillboardLengthScale":2,
					"sortingFudge":10,
					"material":{
						"type":"Laya.ShurikenParticleMaterial",
						"path":"Assets/Materials/StarMaterial.lmat"
					}
				},
				"components":[],
				"child":[]
			}
		]
	}
}