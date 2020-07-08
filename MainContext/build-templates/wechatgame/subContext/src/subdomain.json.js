module.exports = [
  {
    "__type__": "cc.Texture2D",
    "content": "0,9729,9729,33071,33071,0,0,1"
  },
  {
    "__type__": "cc.EffectAsset",
    "_name": "builtin-2d-gray-sprite",
    "techniques": [
      {
        "passes": [
          {
            "blendState": {
              "targets": [
                {
                  "blend": true
                }
              ]
            },
            "rasterizerState": {
              "cullMode": 0
            },
            "properties": {
              "texture": {
                "value": "white",
                "type": 29
              }
            },
            "program": "builtin-2d-gray-sprite|vs|fs"
          }
        ]
      }
    ],
    "shaders": [
      {
        "hash": 4278481454,
        "glsl3": {
          "vert": "\nprecision highp float;\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nin vec3 a_position;\nin mediump vec2 a_uv0;\nout mediump vec2 v_uv0;\nin vec4 a_color;\nout vec4 v_color;\nvoid main () {\n  gl_Position = cc_matViewProj * vec4(a_position, 1);\n  v_uv0 = a_uv0;\n  v_color = a_color;\n}",
          "frag": "\nprecision highp float;\nuniform sampler2D texture;\nin mediump vec2 v_uv0;\nin vec4 v_color;\nvoid main () {\n  vec4 color = v_color;\n  vec4 texture_tmp = texture(texture, v_uv0);\n  #if CC_USE_ALPHA_ATLAS_texture\n      texture_tmp.a *= texture(texture, v_uv0 + vec2(0, 0.5)).r;\n  #endif\n  #if INPUT_IS_GAMMA\n    color.rgb *= (texture_tmp.rgb * texture_tmp.rgb);\n    color.a *= texture_tmp.a;\n  #else\n    color *= texture_tmp;\n  #endif\n  float gray = 0.2126*color.r + 0.7152*color.g + 0.0722*color.b;\n  gl_FragColor = vec4(gray, gray, gray, color.a);\n}"
        },
        "glsl1": {
          "vert": "\nprecision highp float;\nuniform mat4 cc_matViewProj;\nattribute vec3 a_position;\nattribute mediump vec2 a_uv0;\nvarying mediump vec2 v_uv0;\nattribute vec4 a_color;\nvarying vec4 v_color;\nvoid main () {\n  gl_Position = cc_matViewProj * vec4(a_position, 1);\n  v_uv0 = a_uv0;\n  v_color = a_color;\n}",
          "frag": "\nprecision highp float;\nuniform sampler2D texture;\nvarying mediump vec2 v_uv0;\nvarying vec4 v_color;\nvoid main () {\n  vec4 color = v_color;\n  vec4 texture_tmp = texture2D(texture, v_uv0);\n  #if CC_USE_ALPHA_ATLAS_texture\n      texture_tmp.a *= texture2D(texture, v_uv0 + vec2(0, 0.5)).r;\n  #endif\n  #if INPUT_IS_GAMMA\n    color.rgb *= (texture_tmp.rgb * texture_tmp.rgb);\n    color.a *= texture_tmp.a;\n  #else\n    color *= texture_tmp;\n  #endif\n  float gray = 0.2126*color.r + 0.7152*color.g + 0.0722*color.b;\n  gl_FragColor = vec4(gray, gray, gray, color.a);\n}"
        },
        "builtins": {
          "globals": {
            "blocks": [
              {
                "name": "CCGlobal",
                "defines": []
              }
            ],
            "samplers": []
          },
          "locals": {
            "blocks": [],
            "samplers": []
          }
        },
        "defines": [
          {
            "name": "CC_USE_ALPHA_ATLAS_texture",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "INPUT_IS_GAMMA",
            "type": "boolean",
            "defines": []
          }
        ],
        "blocks": [],
        "samplers": [
          {
            "name": "texture",
            "type": 29,
            "count": 1,
            "defines": [],
            "binding": 30
          }
        ],
        "record": null,
        "name": "builtin-2d-gray-sprite|vs|fs"
      }
    ]
  },
  {
    "__type__": "cc.EffectAsset",
    "_name": "builtin-2d-sprite",
    "techniques": [
      {
        "passes": [
          {
            "blendState": {
              "targets": [
                {
                  "blend": true
                }
              ]
            },
            "rasterizerState": {
              "cullMode": 0
            },
            "properties": {
              "texture": {
                "value": "white",
                "type": 29
              },
              "alphaThreshold": {
                "value": [
                  0.5
                ],
                "type": 13
              }
            },
            "program": "builtin-2d-sprite|vs|fs"
          }
        ]
      }
    ],
    "shaders": [
      {
        "hash": 3278106612,
        "glsl3": {
          "vert": "\nprecision highp float;\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nin vec3 a_position;\nin vec4 a_color;\nout vec4 v_color;\n#if USE_TEXTURE\nin vec2 a_uv0;\nout vec2 v_uv0;\n#endif\nvoid main () {\n  vec4 pos = vec4(a_position, 1);\n  #if CC_USE_MODEL\n  pos = cc_matViewProj * cc_matWorld * pos;\n  #else\n  pos = cc_matViewProj * pos;\n  #endif\n  #if USE_TEXTURE\n  v_uv0 = a_uv0;\n  #endif\n  v_color = a_color;\n  gl_Position = pos;\n}",
          "frag": "\nprecision highp float;\n#if USE_ALPHA_TEST\n  uniform ALPHA_TEST {\n    float alphaThreshold;\n  };\n#endif\nvoid ALPHA_TEST (in vec4 color) {\n  #if USE_ALPHA_TEST\n      if (color.a < alphaThreshold) discard;\n  #endif\n}\nvoid ALPHA_TEST (in float alpha) {\n  #if USE_ALPHA_TEST\n      if (alpha < alphaThreshold) discard;\n  #endif\n}\nin vec4 v_color;\n#if USE_TEXTURE\nin vec2 v_uv0;\nuniform sampler2D texture;\n#endif\nvoid main () {\n  vec4 o = vec4(1, 1, 1, 1);\n  #if USE_TEXTURE\n  vec4 texture_tmp = texture(texture, v_uv0);\n  #if CC_USE_ALPHA_ATLAS_texture\n      texture_tmp.a *= texture(texture, v_uv0 + vec2(0, 0.5)).r;\n  #endif\n  #if INPUT_IS_GAMMA\n    o.rgb *= (texture_tmp.rgb * texture_tmp.rgb);\n    o.a *= texture_tmp.a;\n  #else\n    o *= texture_tmp;\n  #endif\n  #endif\n  o *= v_color;\n  ALPHA_TEST(o);\n  gl_FragColor = o;\n}"
        },
        "glsl1": {
          "vert": "\nprecision highp float;\nuniform mat4 cc_matViewProj;\nuniform mat4 cc_matWorld;\nattribute vec3 a_position;\nattribute vec4 a_color;\nvarying vec4 v_color;\n#if USE_TEXTURE\nattribute vec2 a_uv0;\nvarying vec2 v_uv0;\n#endif\nvoid main () {\n  vec4 pos = vec4(a_position, 1);\n  #if CC_USE_MODEL\n  pos = cc_matViewProj * cc_matWorld * pos;\n  #else\n  pos = cc_matViewProj * pos;\n  #endif\n  #if USE_TEXTURE\n  v_uv0 = a_uv0;\n  #endif\n  v_color = a_color;\n  gl_Position = pos;\n}",
          "frag": "\nprecision highp float;\n#if USE_ALPHA_TEST\n  uniform float alphaThreshold;\n#endif\nvoid ALPHA_TEST (in vec4 color) {\n  #if USE_ALPHA_TEST\n      if (color.a < alphaThreshold) discard;\n  #endif\n}\nvoid ALPHA_TEST (in float alpha) {\n  #if USE_ALPHA_TEST\n      if (alpha < alphaThreshold) discard;\n  #endif\n}\nvarying vec4 v_color;\n#if USE_TEXTURE\nvarying vec2 v_uv0;\nuniform sampler2D texture;\n#endif\nvoid main () {\n  vec4 o = vec4(1, 1, 1, 1);\n  #if USE_TEXTURE\n  vec4 texture_tmp = texture2D(texture, v_uv0);\n  #if CC_USE_ALPHA_ATLAS_texture\n      texture_tmp.a *= texture2D(texture, v_uv0 + vec2(0, 0.5)).r;\n  #endif\n  #if INPUT_IS_GAMMA\n    o.rgb *= (texture_tmp.rgb * texture_tmp.rgb);\n    o.a *= texture_tmp.a;\n  #else\n    o *= texture_tmp;\n  #endif\n  #endif\n  o *= v_color;\n  ALPHA_TEST(o);\n  gl_FragColor = o;\n}"
        },
        "builtins": {
          "globals": {
            "blocks": [
              {
                "name": "CCGlobal",
                "defines": []
              }
            ],
            "samplers": []
          },
          "locals": {
            "blocks": [
              {
                "name": "CCLocal",
                "defines": []
              }
            ],
            "samplers": []
          }
        },
        "defines": [
          {
            "name": "USE_TEXTURE",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_MODEL",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "USE_ALPHA_TEST",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_ALPHA_ATLAS_texture",
            "type": "boolean",
            "defines": [
              "USE_TEXTURE"
            ]
          },
          {
            "name": "INPUT_IS_GAMMA",
            "type": "boolean",
            "defines": [
              "USE_TEXTURE"
            ]
          }
        ],
        "blocks": [
          {
            "name": "ALPHA_TEST",
            "members": [
              {
                "name": "alphaThreshold",
                "type": 13,
                "count": 1
              }
            ],
            "defines": [
              "USE_ALPHA_TEST"
            ],
            "binding": 0
          }
        ],
        "samplers": [
          {
            "name": "texture",
            "type": 29,
            "count": 1,
            "defines": [
              "USE_TEXTURE"
            ],
            "binding": 30
          }
        ],
        "record": null,
        "name": "builtin-2d-sprite|vs|fs"
      }
    ]
  },
  {
    "__type__": "cc.Material",
    "_name": "builtin-unlit",
    "_effectAsset": {
      "__uuid__": "6dkeWRTOBGXICfYQ7JUBnG"
    },
    "_techniqueData": {
      "0": {
        "props": {
          "diffuseTexture": {
            "__uuid__": "02delMVqdBD70a/HSD99FK"
          }
        },
        "defines": {
          "USE_DIFFUSE_TEXTURE": true
        }
      }
    }
  },
  {
    "__type__": "cc.EffectAsset",
    "_name": "builtin-3d-trail",
    "techniques": [
      {
        "name": "add",
        "passes": [
          {
            "rasterizerState": {
              "cullMode": 0
            },
            "blendState": {
              "targets": [
                {
                  "blend": true,
                  "blendSrc": 770,
                  "blendDst": 1,
                  "blendSrcAlpha": 770,
                  "blendDstAlpha": 1
                }
              ]
            },
            "depthStencilState": {
              "depthTest": true,
              "depthWrite": false
            },
            "properties": {
              "mainTexture": {
                "value": "grey",
                "type": 29
              },
              "mainTiling_Offset": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              },
              "frameTile_velLenScale": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              },
              "tintColor": {
                "value": [
                  0.5,
                  0.5,
                  0.5,
                  0.5
                ],
                "inspector": {
                  "type": "color"
                },
                "type": 16
              }
            },
            "program": "builtin-3d-trail|particle-trail:vs_main|tinted-fs:add"
          }
        ]
      },
      {
        "name": "alpha-blend",
        "passes": [
          {
            "rasterizerState": {
              "cullMode": 0
            },
            "blendState": {
              "targets": [
                {
                  "blend": true,
                  "blendSrc": 1,
                  "blendDst": 771,
                  "blendSrcAlpha": 1,
                  "blendDstAlpha": 771
                }
              ]
            },
            "depthStencilState": {
              "depthTest": true,
              "depthWrite": false
            },
            "properties": {
              "mainTexture": {
                "value": "grey",
                "type": 29
              },
              "mainTiling_Offset": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              },
              "frameTile_velLenScale": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              },
              "tintColor": {
                "value": [
                  0.5,
                  0.5,
                  0.5,
                  0.5
                ],
                "inspector": {
                  "type": "color"
                },
                "type": 16
              }
            },
            "program": "builtin-3d-trail|particle-trail:vs_main|tinted-fs:add"
          }
        ]
      },
      {
        "name": "add-multiply",
        "passes": [
          {
            "rasterizerState": {
              "cullMode": 0
            },
            "blendState": {
              "targets": [
                {
                  "blend": true,
                  "blendSrc": 1,
                  "blendDst": 771,
                  "blendSrcAlpha": 1,
                  "blendDstAlpha": 771
                }
              ]
            },
            "depthStencilState": {
              "depthTest": true,
              "depthWrite": false
            },
            "properties": {
              "mainTexture": {
                "value": "grey",
                "type": 29
              },
              "mainTiling_Offset": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              },
              "frameTile_velLenScale": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              },
              "tintColor": {
                "value": [
                  0.5,
                  0.5,
                  0.5,
                  0.5
                ],
                "inspector": {
                  "type": "color"
                },
                "type": 16
              }
            },
            "program": "builtin-3d-trail|particle-trail:vs_main|tinted-fs:multiply"
          }
        ]
      },
      {
        "name": "add-smooth",
        "passes": [
          {
            "rasterizerState": {
              "cullMode": 0
            },
            "blendState": {
              "targets": [
                {
                  "blend": true,
                  "blendSrc": 1,
                  "blendDst": 771,
                  "blendSrcAlpha": 1,
                  "blendDstAlpha": 771
                }
              ]
            },
            "depthStencilState": {
              "depthTest": true,
              "depthWrite": false
            },
            "properties": {
              "mainTexture": {
                "value": "grey",
                "type": 29
              },
              "mainTiling_Offset": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              },
              "frameTile_velLenScale": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              }
            },
            "program": "builtin-3d-trail|particle-trail:vs_main|no-tint-fs:addSmooth"
          }
        ]
      },
      {
        "name": "premultiply-blend",
        "passes": [
          {
            "rasterizerState": {
              "cullMode": 0
            },
            "blendState": {
              "targets": [
                {
                  "blend": true,
                  "blendSrc": 1,
                  "blendDst": 771,
                  "blendSrcAlpha": 1,
                  "blendDstAlpha": 771
                }
              ]
            },
            "depthStencilState": {
              "depthTest": true,
              "depthWrite": false
            },
            "properties": {
              "mainTexture": {
                "value": "grey",
                "type": 29
              },
              "mainTiling_Offset": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              },
              "frameTile_velLenScale": {
                "value": [
                  1,
                  1,
                  0,
                  0
                ],
                "type": 16
              }
            },
            "program": "builtin-3d-trail|particle-trail:vs_main|no-tint-fs:premultiplied"
          }
        ]
      }
    ],
    "shaders": [
      {
        "hash": 2929688198,
        "glsl3": {
          "vert": "\nprecision mediump float;\nuniform Constants{\n    vec4 mainTiling_Offset;\n    vec4 frameTile_velLenScale;\n    vec4 scale;\n};\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nout vec2 uv;\nout vec4 color;\nin vec3 a_position;\nin vec4 a_texCoord;\nin vec3 a_texCoord1;\nin vec3 a_texCoord2;\nin vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    out vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
          "frag": "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nin vec2 uv;\nin vec4 color;\n#if CC_DRAW_WIRE_FRAME\n  in vec3 vBarycentric;\n#endif\nuniform sampler2D mainTexture;\nuniform FragConstants {\n  vec4 tintColor;\n};\nvec4 add () {\n  vec4 col = 2.0 * color * tintColor * texture(mainTexture, uv);\n  #if CC_DRAW_WIRE_FRAME\n      if (any(lessThan(vBarycentric, vec3(0.02)))) {\n          col = vec4(0., 1., 1., 1.);\n      }\n  #endif\n  return CCFragOutput(col);\n}\nout vec4 cc_FragColor;\nvoid main() { cc_FragColor = add(); }"
        },
        "glsl1": {
          "vert": "\nprecision mediump float;\nuniform vec4 mainTiling_Offset;\nuniform mat4 cc_matViewProj;\nuniform vec4 cc_cameraPos;\nuniform mat4 cc_matWorld;\nvarying vec2 uv;\nvarying vec4 color;\nattribute vec3 a_position;\nattribute vec4 a_texCoord;\nattribute vec3 a_texCoord1;\nattribute vec3 a_texCoord2;\nattribute vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    varying vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
          "frag": "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nvarying vec2 uv;\nvarying vec4 color;\n#if CC_DRAW_WIRE_FRAME\n  varying vec3 vBarycentric;\n#endif\nuniform sampler2D mainTexture;\nuniform vec4 tintColor;\nvec4 add () {\n  vec4 col = 2.0 * color * tintColor * texture2D(mainTexture, uv);\n  #if CC_DRAW_WIRE_FRAME\n      if (any(lessThan(vBarycentric, vec3(0.02)))) {\n          col = vec4(0., 1., 1., 1.);\n      }\n  #endif\n  return CCFragOutput(col);\n}\nvoid main() { gl_FragColor = add(); }"
        },
        "builtins": {
          "globals": {
            "blocks": [
              {
                "name": "CCGlobal",
                "defines": []
              }
            ],
            "samplers": []
          },
          "locals": {
            "blocks": [
              {
                "name": "CCLocal",
                "defines": []
              }
            ],
            "samplers": []
          }
        },
        "defines": [
          {
            "name": "CC_DRAW_WIRE_FRAME",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_WORLD_SPACE",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "OUTPUT_TO_GAMMA",
            "type": "boolean",
            "defines": []
          }
        ],
        "blocks": [
          {
            "name": "Constants",
            "members": [
              {
                "name": "mainTiling_Offset",
                "type": 16,
                "count": 1
              },
              {
                "name": "frameTile_velLenScale",
                "type": 16,
                "count": 1
              },
              {
                "name": "scale",
                "type": 16,
                "count": 1
              }
            ],
            "defines": [],
            "binding": 0
          },
          {
            "name": "FragConstants",
            "members": [
              {
                "name": "tintColor",
                "type": 16,
                "count": 1
              }
            ],
            "defines": [],
            "binding": 1
          }
        ],
        "samplers": [
          {
            "name": "mainTexture",
            "type": 29,
            "count": 1,
            "defines": [],
            "binding": 30
          }
        ],
        "record": null,
        "name": "builtin-3d-trail|particle-trail:vs_main|tinted-fs:add"
      },
      {
        "hash": 4224037318,
        "glsl3": {
          "vert": "\nprecision mediump float;\nuniform Constants{\n    vec4 mainTiling_Offset;\n    vec4 frameTile_velLenScale;\n    vec4 scale;\n};\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nout vec2 uv;\nout vec4 color;\nin vec3 a_position;\nin vec4 a_texCoord;\nin vec3 a_texCoord1;\nin vec3 a_texCoord2;\nin vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    out vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
          "frag": "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nin vec2 uv;\nin vec4 color;\n#if CC_DRAW_WIRE_FRAME\n  in vec3 vBarycentric;\n#endif\nuniform sampler2D mainTexture;\nuniform FragConstants {\n  vec4 tintColor;\n};\nvec4 multiply () {\n  vec4 col;\n  vec4 texColor = texture(mainTexture, uv);\n  col.rgb = tintColor.rgb * texColor.rgb * color.rgb * vec3(2.0);\n  col.a = (1.0 - texColor.a) * (tintColor.a * color.a * 2.0);\n  #if CC_DRAW_WIRE_FRAME\n      if (any(lessThan(vBarycentric, vec3(0.02)))) {\n          col = vec4(0., 1., 1., col.a);\n      }\n  #endif\n  return CCFragOutput(col);\n}\nout vec4 cc_FragColor;\nvoid main() { cc_FragColor = multiply(); }"
        },
        "glsl1": {
          "vert": "\nprecision mediump float;\nuniform vec4 mainTiling_Offset;\nuniform mat4 cc_matViewProj;\nuniform vec4 cc_cameraPos;\nuniform mat4 cc_matWorld;\nvarying vec2 uv;\nvarying vec4 color;\nattribute vec3 a_position;\nattribute vec4 a_texCoord;\nattribute vec3 a_texCoord1;\nattribute vec3 a_texCoord2;\nattribute vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    varying vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
          "frag": "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nvarying vec2 uv;\nvarying vec4 color;\n#if CC_DRAW_WIRE_FRAME\n  varying vec3 vBarycentric;\n#endif\nuniform sampler2D mainTexture;\nuniform vec4 tintColor;\nvec4 multiply () {\n  vec4 col;\n  vec4 texColor = texture2D(mainTexture, uv);\n  col.rgb = tintColor.rgb * texColor.rgb * color.rgb * vec3(2.0);\n  col.a = (1.0 - texColor.a) * (tintColor.a * color.a * 2.0);\n  #if CC_DRAW_WIRE_FRAME\n      if (any(lessThan(vBarycentric, vec3(0.02)))) {\n          col = vec4(0., 1., 1., col.a);\n      }\n  #endif\n  return CCFragOutput(col);\n}\nvoid main() { gl_FragColor = multiply(); }"
        },
        "builtins": {
          "globals": {
            "blocks": [
              {
                "name": "CCGlobal",
                "defines": []
              }
            ],
            "samplers": []
          },
          "locals": {
            "blocks": [
              {
                "name": "CCLocal",
                "defines": []
              }
            ],
            "samplers": []
          }
        },
        "defines": [
          {
            "name": "CC_DRAW_WIRE_FRAME",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_WORLD_SPACE",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "OUTPUT_TO_GAMMA",
            "type": "boolean",
            "defines": []
          }
        ],
        "blocks": [
          {
            "name": "Constants",
            "members": [
              {
                "name": "mainTiling_Offset",
                "type": 16,
                "count": 1
              },
              {
                "name": "frameTile_velLenScale",
                "type": 16,
                "count": 1
              },
              {
                "name": "scale",
                "type": 16,
                "count": 1
              }
            ],
            "defines": [],
            "binding": 0
          },
          {
            "name": "FragConstants",
            "members": [
              {
                "name": "tintColor",
                "type": 16,
                "count": 1
              }
            ],
            "defines": [],
            "binding": 1
          }
        ],
        "samplers": [
          {
            "name": "mainTexture",
            "type": 29,
            "count": 1,
            "defines": [],
            "binding": 30
          }
        ],
        "record": null,
        "name": "builtin-3d-trail|particle-trail:vs_main|tinted-fs:multiply"
      },
      {
        "hash": 1704877102,
        "glsl3": {
          "vert": "\nprecision mediump float;\nuniform Constants{\n    vec4 mainTiling_Offset;\n    vec4 frameTile_velLenScale;\n    vec4 scale;\n};\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nout vec2 uv;\nout vec4 color;\nin vec3 a_position;\nin vec4 a_texCoord;\nin vec3 a_texCoord1;\nin vec3 a_texCoord2;\nin vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    out vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
          "frag": "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nin vec2 uv;\nin vec4 color;\nuniform sampler2D mainTexture;\nvec4 addSmooth () {\n  vec4 col = color * texture(mainTexture, uv);\n  col.rgb *= col.a;\n  return CCFragOutput(col);\n}\nout vec4 cc_FragColor;\nvoid main() { cc_FragColor = addSmooth(); }"
        },
        "glsl1": {
          "vert": "\nprecision mediump float;\nuniform vec4 mainTiling_Offset;\nuniform mat4 cc_matViewProj;\nuniform vec4 cc_cameraPos;\nuniform mat4 cc_matWorld;\nvarying vec2 uv;\nvarying vec4 color;\nattribute vec3 a_position;\nattribute vec4 a_texCoord;\nattribute vec3 a_texCoord1;\nattribute vec3 a_texCoord2;\nattribute vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    varying vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
          "frag": "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nvarying vec2 uv;\nvarying vec4 color;\nuniform sampler2D mainTexture;\nvec4 addSmooth () {\n  vec4 col = color * texture2D(mainTexture, uv);\n  col.rgb *= col.a;\n  return CCFragOutput(col);\n}\nvoid main() { gl_FragColor = addSmooth(); }"
        },
        "builtins": {
          "globals": {
            "blocks": [
              {
                "name": "CCGlobal",
                "defines": []
              }
            ],
            "samplers": []
          },
          "locals": {
            "blocks": [
              {
                "name": "CCLocal",
                "defines": []
              }
            ],
            "samplers": []
          }
        },
        "defines": [
          {
            "name": "CC_DRAW_WIRE_FRAME",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_WORLD_SPACE",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "OUTPUT_TO_GAMMA",
            "type": "boolean",
            "defines": []
          }
        ],
        "blocks": [
          {
            "name": "Constants",
            "members": [
              {
                "name": "mainTiling_Offset",
                "type": 16,
                "count": 1
              },
              {
                "name": "frameTile_velLenScale",
                "type": 16,
                "count": 1
              },
              {
                "name": "scale",
                "type": 16,
                "count": 1
              }
            ],
            "defines": [],
            "binding": 0
          }
        ],
        "samplers": [
          {
            "name": "mainTexture",
            "type": 29,
            "count": 1,
            "defines": [],
            "binding": 30
          }
        ],
        "record": null,
        "name": "builtin-3d-trail|particle-trail:vs_main|no-tint-fs:addSmooth"
      },
      {
        "hash": 2717357054,
        "glsl3": {
          "vert": "\nprecision mediump float;\nuniform Constants{\n    vec4 mainTiling_Offset;\n    vec4 frameTile_velLenScale;\n    vec4 scale;\n};\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nout vec2 uv;\nout vec4 color;\nin vec3 a_position;\nin vec4 a_texCoord;\nin vec3 a_texCoord1;\nin vec3 a_texCoord2;\nin vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    out vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
          "frag": "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nin vec2 uv;\nin vec4 color;\nuniform sampler2D mainTexture;\nvec4 premultiplied () {\n  vec4 col = color * texture(mainTexture, uv) * color.a;\n  return CCFragOutput(col);\n}\nout vec4 cc_FragColor;\nvoid main() { cc_FragColor = premultiplied(); }"
        },
        "glsl1": {
          "vert": "\nprecision mediump float;\nuniform vec4 mainTiling_Offset;\nuniform mat4 cc_matViewProj;\nuniform vec4 cc_cameraPos;\nuniform mat4 cc_matWorld;\nvarying vec2 uv;\nvarying vec4 color;\nattribute vec3 a_position;\nattribute vec4 a_texCoord;\nattribute vec3 a_texCoord1;\nattribute vec3 a_texCoord2;\nattribute vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    varying vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
          "frag": "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nvarying vec2 uv;\nvarying vec4 color;\nuniform sampler2D mainTexture;\nvec4 premultiplied () {\n  vec4 col = color * texture2D(mainTexture, uv) * color.a;\n  return CCFragOutput(col);\n}\nvoid main() { gl_FragColor = premultiplied(); }"
        },
        "builtins": {
          "globals": {
            "blocks": [
              {
                "name": "CCGlobal",
                "defines": []
              }
            ],
            "samplers": []
          },
          "locals": {
            "blocks": [
              {
                "name": "CCLocal",
                "defines": []
              }
            ],
            "samplers": []
          }
        },
        "defines": [
          {
            "name": "CC_DRAW_WIRE_FRAME",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_WORLD_SPACE",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "OUTPUT_TO_GAMMA",
            "type": "boolean",
            "defines": []
          }
        ],
        "blocks": [
          {
            "name": "Constants",
            "members": [
              {
                "name": "mainTiling_Offset",
                "type": 16,
                "count": 1
              },
              {
                "name": "frameTile_velLenScale",
                "type": 16,
                "count": 1
              },
              {
                "name": "scale",
                "type": 16,
                "count": 1
              }
            ],
            "defines": [],
            "binding": 0
          }
        ],
        "samplers": [
          {
            "name": "mainTexture",
            "type": 29,
            "count": 1,
            "defines": [],
            "binding": 30
          }
        ],
        "record": null,
        "name": "builtin-3d-trail|particle-trail:vs_main|no-tint-fs:premultiplied"
      }
    ]
  },
  {
    "__type__": "cc.SpriteFrame",
    "content": {
      "name": "qtr",
      "texture": "799RJ+7LhE/IzUdAliwTIe",
      "rect": [
        1,
        1,
        630,
        111
      ],
      "offset": [
        0,
        0
      ],
      "originalSize": [
        630,
        111
      ],
      "capInsets": [
        0,
        0,
        0,
        0
      ]
    }
  },
  {
    "__type__": "cc.Material",
    "_name": "builtin-2d-gray-sprite",
    "_effectAsset": {
      "__uuid__": "14TDKXr2NJ6LjvHPops74o"
    },
    "_techniqueData": {}
  },
  [
    {
      "__type__": "cc.Prefab",
      "_name": "friendRankPanel",
      "data": {
        "__id__": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "friendRankPanel",
      "_children": [
        {
          "__id__": 2
        }
      ],
      "_components": [
        {
          "__type__": "4c2f8ukf4lN8qJZH9TwE2AG",
          "node": {
            "__id__": 1
          }
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__id__": 0
        },
        "fileId": "8cxYv60vhPOK5K7TNs4Ota"
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "New Sprite(Splash)",
      "_parent": {
        "__id__": 1
      },
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 2
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ],
          "_spriteFrame": {
            "__uuid__": "a2MjXRFdtLlYQ5ouAFv/+R"
          },
          "_sizeMode": 0
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__id__": 0
        },
        "fileId": "3eTkGGV7hAvLZt0tLslOo5"
      },
      "_color": {
        "__type__": "cc.Color",
        "r": 132,
        "g": 218,
        "b": 232
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 500,
        "height": 600
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    }
  ],
  {
    "__type__": "cc.Material",
    "_name": "builtin-3d-trail",
    "_effectAsset": {
      "__uuid__": "2afAA24LNP4YmYiaVLiivs"
    },
    "_techniqueData": {
      "0": {
        "props": {
          "mainTexture": {
            "__uuid__": "02delMVqdBD70a/HSD99FK"
          }
        }
      }
    }
  },
  {
    "__type__": "cc.EffectAsset",
    "_name": "builtin-unlit",
    "techniques": [
      {
        "name": "opaque",
        "passes": [
          {
            "blendState": {
              "targets": [
                {
                  "blend": true
                }
              ]
            },
            "rasterizerState": {
              "cullMode": 0
            },
            "depthStencilState": {
              "depthTest": true,
              "depthWrite": true
            },
            "properties": {
              "diffuseTexture": {
                "value": "white",
                "type": 29
              },
              "diffuseColor": {
                "value": [
                  1,
                  1,
                  1,
                  1
                ],
                "editor": {
                  "type": "color"
                },
                "type": 16
              },
              "alphaThreshold": {
                "value": [
                  0.5
                ],
                "type": 13
              },
              "mainTiling": {
                "value": [
                  1,
                  1
                ],
                "type": 14
              },
              "mainOffset": {
                "value": [
                  0,
                  0
                ],
                "type": 14
              }
            },
            "program": "builtin-unlit|unlit-vs|unlit-fs"
          }
        ]
      },
      {
        "name": "transparent",
        "passes": [
          {
            "stage": "transparent",
            "blendState": {
              "targets": [
                {
                  "blend": true
                }
              ]
            },
            "rasterizerState": {
              "cullMode": 0
            },
            "depthStencilState": {
              "depthTest": true,
              "depthWrite": true
            },
            "properties": {
              "diffuseTexture": {
                "value": "white",
                "type": 29
              },
              "diffuseColor": {
                "value": [
                  1,
                  1,
                  1,
                  1
                ],
                "editor": {
                  "type": "color"
                },
                "type": 16
              },
              "alphaThreshold": {
                "value": [
                  0.5
                ],
                "type": 13
              },
              "mainTiling": {
                "value": [
                  1,
                  1
                ],
                "type": 14
              },
              "mainOffset": {
                "value": [
                  0,
                  0
                ],
                "type": 14
              }
            },
            "program": "builtin-unlit|unlit-vs|unlit-fs"
          }
        ]
      }
    ],
    "shaders": [
      {
        "hash": 922858114,
        "glsl3": {
          "vert": "\nprecision highp float;\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\n#if CC_USE_SKINNING\n  in vec4 a_weights;\n  in vec4 a_joints;\n  #if CC_USE_JOINTS_TEXTRUE\n    uniform SKINNING {\n      vec2 jointsTextureSize;\n    };\n    uniform sampler2D jointsTexture;\n    #if CC_JOINTS_TEXTURE_FLOAT32\n      mat4 getBoneMatrix(const in float i) {\n        float width = jointsTextureSize.x;\n        float height = jointsTextureSize.y;\n        float j = i * 4.0;\n        float x = mod(j, width);\n        float y = floor(j / width);\n        float dx = 1.0 / width;\n        float dy = 1.0 / height;\n        y = dy * (y + 0.5);\n        vec4 v1 = texture(jointsTexture, vec2(dx * (x + 0.5), y));\n        vec4 v2 = texture(jointsTexture, vec2(dx * (x + 1.5), y));\n        vec4 v3 = texture(jointsTexture, vec2(dx * (x + 2.5), y));\n        vec4 v4 = texture(jointsTexture, vec2(dx * (x + 3.5), y));\n        return mat4(v1, v2, v3, v4);\n      }\n    #else\n      float decode32(vec4 rgba) {\n        float Sign = 1.0 - step(128.0, rgba[0]) * 2.0;\n        float Exponent = 2.0 * mod(rgba[0], 128.0) + step(128.0, rgba[1]) - 127.0;\n        float Mantissa = mod(rgba[1], 128.0) * 65536.0 + rgba[2] * 256.0 + rgba[3] + 8388608.0;\n        return Sign * exp2(Exponent - 23.0) * Mantissa;\n      }\n      vec4 decodevec4 (vec4 x, vec4 y, vec4 z, vec4 w) {\n        return vec4(\n          decode32(x.wzyx * 255.0),\n          decode32(y.wzyx * 255.0),\n          decode32(z.wzyx * 255.0),\n          decode32(w.wzyx * 255.0)\n        );\n      }\n      vec4 decodevec4 (float dx, float x, float y) {\n        return decodevec4(\n          texture(jointsTexture, vec2(dx * (x + 0.5), y)),\n          texture(jointsTexture, vec2(dx * (x + 1.5), y)),\n          texture(jointsTexture, vec2(dx * (x + 2.5), y)),\n          texture(jointsTexture, vec2(dx * (x + 3.5), y))\n        );\n      }\n      mat4 getBoneMatrix(const in float i) {\n        float width = jointsTextureSize.x;\n        float height = jointsTextureSize.y;\n        float j = i * 16.0;\n        float x = mod(j, width);\n        float y = floor(j / width);\n        float dx = 1.0 / width;\n        float dy = 1.0 / height;\n        y = dy * (y + 0.5);\n        vec4 v1 = decodevec4(dx, x,       y);\n        vec4 v2 = decodevec4(dx, x+4.0,   y);\n        vec4 v3 = decodevec4(dx, x+8.0,   y);\n        vec4 v4 = decodevec4(dx, x+12.0,  y);\n        return mat4(v1, v2, v3, v4);\n      }\n    #endif\n  #else\n    uniform JOINT_MATRIX {\n      mat4 jointMatrices[50];\n    };\n    mat4 getBoneMatrix(const in float i) {\n      return jointMatrices[int(i)];\n    }\n  #endif\n    mat4 skinMatrix() {\n      return\n        getBoneMatrix(a_joints.x) * a_weights.x +\n        getBoneMatrix(a_joints.y) * a_weights.y +\n        getBoneMatrix(a_joints.z) * a_weights.z +\n        getBoneMatrix(a_joints.w) * a_weights.w\n        ;\n    }\n#endif\nstruct StandardVertInput {\n  vec2 uv;\n  vec4 position;\n  vec3 normal;\n  vec4 tangent;\n  vec4 color;\n};\nin vec3 a_position;\n#if CC_USE_ATTRIBUTE_UV0\nin vec2 a_uv0;\n#endif\n#if CC_USE_ATTRIBUTE_COLOR\nin vec4 a_color;\n#endif\n#if CC_USE_ATTRIBUTE_NORMAL\nin vec3 a_normal;\n#endif\n#if CC_USE_ATTRIBUTE_TANGENT\nin vec4 a_tangent;\n#endif\nvoid CCAttribute (out StandardVertInput In) {\n  In.position = vec4(a_position, 1.0);\n  #if CC_USE_ATTRIBUTE_UV0\n    In.uv = a_uv0;\n  #else\n    In.uv = vec2(0.0);\n  #endif\n  #if CC_USE_ATTRIBUTE_COLOR\n    In.color = a_color;\n  #else\n    In.color = vec4(1.0);\n  #endif\n  #if CC_USE_ATTRIBUTE_NORMAL\n    In.normal = a_normal;\n  #else\n    In.normal = vec3(0.0, 1.0, 0.0);\n  #endif\n  #if CC_USE_ATTRIBUTE_TANGENT\n    In.tangent = a_tangent;\n  #else\n    In.tangent = vec4(1.0, 0.0, 0.0, 0.0);\n  #endif\n}\nvoid CCVertInput(out StandardVertInput In) {\n  CCAttribute(In);\n  #if CC_USE_SKINNING\n    mat4 m = skinMatrix();\n    In.position = m * In.position;\n    #if CC_USE_ATTRIBUTE_NORMAL\n      In.normal = (m * vec4(In.normal, 0)).xyz;\n    #endif\n    #if CC_USE_ATTRIBUTE_TANGENT\n      In.tangent = m * In.tangent;\n    #endif\n  #endif\n}\nuniform MAIN_TILING {\n  vec2 mainTiling;\n  vec2 mainOffset;\n};\n#if CC_USE_ATTRIBUTE_UV0 && USE_DIFFUSE_TEXTURE\n  out mediump vec2 v_uv0;\n#endif\n#if CC_USE_ATTRIBUTE_COLOR\n  out lowp vec4 v_color;\n#endif\nvoid main () {\n  StandardVertInput In;\n  CCVertInput(In);\n  #if CC_USE_ATTRIBUTE_COLOR\n    v_color = In.color;\n  #endif\n  #if CC_USE_ATTRIBUTE_UV0 && USE_DIFFUSE_TEXTURE\n    v_uv0 = In.uv * mainTiling + mainOffset;\n  #endif\n  gl_Position = cc_matViewProj * cc_matWorld * In.position;\n}",
          "frag": "\nprecision highp float;\n#if USE_ALPHA_TEST\n  uniform ALPHA_TEST {\n    float alphaThreshold;\n  };\n#endif\nvoid ALPHA_TEST (in vec4 color) {\n  #if USE_ALPHA_TEST\n      if (color.a < alphaThreshold) discard;\n  #endif\n}\nvoid ALPHA_TEST (in float alpha) {\n  #if USE_ALPHA_TEST\n      if (alpha < alphaThreshold) discard;\n  #endif\n}\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nuniform UNLIT {\n  lowp vec4 diffuseColor;\n};\n#if USE_DIFFUSE_TEXTURE\n  uniform sampler2D diffuseTexture;\n#endif\n#if CC_USE_ATTRIBUTE_COLOR\n  in lowp vec4 v_color;\n#endif\n#if CC_USE_ATTRIBUTE_UV0 && USE_DIFFUSE_TEXTURE\n  in mediump vec2 v_uv0;\n#endif\nvoid main () {\n  vec4 color = diffuseColor;\n  #if CC_USE_ATTRIBUTE_UV0 && USE_DIFFUSE_TEXTURE\n  vec4 diffuseTexture_tmp = texture(diffuseTexture, v_uv0);\n  #if CC_USE_ALPHA_ATLAS_diffuseTexture\n      diffuseTexture_tmp.a *= texture(diffuseTexture, v_uv0 + vec2(0, 0.5)).r;\n  #endif\n  #if INPUT_IS_GAMMA\n    color.rgb *= (diffuseTexture_tmp.rgb * diffuseTexture_tmp.rgb);\n    color.a *= diffuseTexture_tmp.a;\n  #else\n    color *= diffuseTexture_tmp;\n  #endif\n  #endif\n  #if CC_USE_ATTRIBUTE_COLOR\n    color *= v_color;\n  #endif\n  ALPHA_TEST(color);\n  gl_FragColor = CCFragOutput(color);\n}"
        },
        "glsl1": {
          "vert": "\nprecision highp float;\nuniform mat4 cc_matWorld;\nuniform mat4 cc_matViewProj;\n#if CC_USE_SKINNING\n  attribute vec4 a_weights;\n  attribute vec4 a_joints;\n  #if CC_USE_JOINTS_TEXTRUE\n    uniform vec2 jointsTextureSize;\n    uniform sampler2D jointsTexture;\n    #if CC_JOINTS_TEXTURE_FLOAT32\n      mat4 getBoneMatrix(const in float i) {\n        float width = jointsTextureSize.x;\n        float height = jointsTextureSize.y;\n        float j = i * 4.0;\n        float x = mod(j, width);\n        float y = floor(j / width);\n        float dx = 1.0 / width;\n        float dy = 1.0 / height;\n        y = dy * (y + 0.5);\n        vec4 v1 = texture2D(jointsTexture, vec2(dx * (x + 0.5), y));\n        vec4 v2 = texture2D(jointsTexture, vec2(dx * (x + 1.5), y));\n        vec4 v3 = texture2D(jointsTexture, vec2(dx * (x + 2.5), y));\n        vec4 v4 = texture2D(jointsTexture, vec2(dx * (x + 3.5), y));\n        return mat4(v1, v2, v3, v4);\n      }\n    #else\n      float decode32(vec4 rgba) {\n        float Sign = 1.0 - step(128.0, rgba[0]) * 2.0;\n        float Exponent = 2.0 * mod(rgba[0], 128.0) + step(128.0, rgba[1]) - 127.0;\n        float Mantissa = mod(rgba[1], 128.0) * 65536.0 + rgba[2] * 256.0 + rgba[3] + 8388608.0;\n        return Sign * exp2(Exponent - 23.0) * Mantissa;\n      }\n      vec4 decodevec4 (vec4 x, vec4 y, vec4 z, vec4 w) {\n        return vec4(\n          decode32(x.wzyx * 255.0),\n          decode32(y.wzyx * 255.0),\n          decode32(z.wzyx * 255.0),\n          decode32(w.wzyx * 255.0)\n        );\n      }\n      vec4 decodevec4 (float dx, float x, float y) {\n        return decodevec4(\n          texture2D(jointsTexture, vec2(dx * (x + 0.5), y)),\n          texture2D(jointsTexture, vec2(dx * (x + 1.5), y)),\n          texture2D(jointsTexture, vec2(dx * (x + 2.5), y)),\n          texture2D(jointsTexture, vec2(dx * (x + 3.5), y))\n        );\n      }\n      mat4 getBoneMatrix(const in float i) {\n        float width = jointsTextureSize.x;\n        float height = jointsTextureSize.y;\n        float j = i * 16.0;\n        float x = mod(j, width);\n        float y = floor(j / width);\n        float dx = 1.0 / width;\n        float dy = 1.0 / height;\n        y = dy * (y + 0.5);\n        vec4 v1 = decodevec4(dx, x,       y);\n        vec4 v2 = decodevec4(dx, x+4.0,   y);\n        vec4 v3 = decodevec4(dx, x+8.0,   y);\n        vec4 v4 = decodevec4(dx, x+12.0,  y);\n        return mat4(v1, v2, v3, v4);\n      }\n    #endif\n  #else\n    uniform mat4 jointMatrices[50];\n    mat4 getBoneMatrix(const in float i) {\n      return jointMatrices[int(i)];\n    }\n  #endif\n    mat4 skinMatrix() {\n      return\n        getBoneMatrix(a_joints.x) * a_weights.x +\n        getBoneMatrix(a_joints.y) * a_weights.y +\n        getBoneMatrix(a_joints.z) * a_weights.z +\n        getBoneMatrix(a_joints.w) * a_weights.w\n        ;\n    }\n#endif\nstruct StandardVertInput {\n  vec2 uv;\n  vec4 position;\n  vec3 normal;\n  vec4 tangent;\n  vec4 color;\n};\nattribute vec3 a_position;\n#if CC_USE_ATTRIBUTE_UV0\nattribute vec2 a_uv0;\n#endif\n#if CC_USE_ATTRIBUTE_COLOR\nattribute vec4 a_color;\n#endif\n#if CC_USE_ATTRIBUTE_NORMAL\nattribute vec3 a_normal;\n#endif\n#if CC_USE_ATTRIBUTE_TANGENT\nattribute vec4 a_tangent;\n#endif\nvoid CCAttribute (out StandardVertInput In) {\n  In.position = vec4(a_position, 1.0);\n  #if CC_USE_ATTRIBUTE_UV0\n    In.uv = a_uv0;\n  #else\n    In.uv = vec2(0.0);\n  #endif\n  #if CC_USE_ATTRIBUTE_COLOR\n    In.color = a_color;\n  #else\n    In.color = vec4(1.0);\n  #endif\n  #if CC_USE_ATTRIBUTE_NORMAL\n    In.normal = a_normal;\n  #else\n    In.normal = vec3(0.0, 1.0, 0.0);\n  #endif\n  #if CC_USE_ATTRIBUTE_TANGENT\n    In.tangent = a_tangent;\n  #else\n    In.tangent = vec4(1.0, 0.0, 0.0, 0.0);\n  #endif\n}\nvoid CCVertInput(out StandardVertInput In) {\n  CCAttribute(In);\n  #if CC_USE_SKINNING\n    mat4 m = skinMatrix();\n    In.position = m * In.position;\n    #if CC_USE_ATTRIBUTE_NORMAL\n      In.normal = (m * vec4(In.normal, 0)).xyz;\n    #endif\n    #if CC_USE_ATTRIBUTE_TANGENT\n      In.tangent = m * In.tangent;\n    #endif\n  #endif\n}\nuniform vec2 mainTiling;\nuniform vec2 mainOffset;\n#if CC_USE_ATTRIBUTE_UV0 && USE_DIFFUSE_TEXTURE\n  varying mediump vec2 v_uv0;\n#endif\n#if CC_USE_ATTRIBUTE_COLOR\n  varying lowp vec4 v_color;\n#endif\nvoid main () {\n  StandardVertInput In;\n  CCVertInput(In);\n  #if CC_USE_ATTRIBUTE_COLOR\n    v_color = In.color;\n  #endif\n  #if CC_USE_ATTRIBUTE_UV0 && USE_DIFFUSE_TEXTURE\n    v_uv0 = In.uv * mainTiling + mainOffset;\n  #endif\n  gl_Position = cc_matViewProj * cc_matWorld * In.position;\n}",
          "frag": "\nprecision highp float;\n#if USE_ALPHA_TEST\n  uniform float alphaThreshold;\n#endif\nvoid ALPHA_TEST (in vec4 color) {\n  #if USE_ALPHA_TEST\n      if (color.a < alphaThreshold) discard;\n  #endif\n}\nvoid ALPHA_TEST (in float alpha) {\n  #if USE_ALPHA_TEST\n      if (alpha < alphaThreshold) discard;\n  #endif\n}\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nuniform lowp vec4 diffuseColor;\n#if USE_DIFFUSE_TEXTURE\n  uniform sampler2D diffuseTexture;\n#endif\n#if CC_USE_ATTRIBUTE_COLOR\n  varying lowp vec4 v_color;\n#endif\n#if CC_USE_ATTRIBUTE_UV0 && USE_DIFFUSE_TEXTURE\n  varying mediump vec2 v_uv0;\n#endif\nvoid main () {\n  vec4 color = diffuseColor;\n  #if CC_USE_ATTRIBUTE_UV0 && USE_DIFFUSE_TEXTURE\n  vec4 diffuseTexture_tmp = texture2D(diffuseTexture, v_uv0);\n  #if CC_USE_ALPHA_ATLAS_diffuseTexture\n      diffuseTexture_tmp.a *= texture2D(diffuseTexture, v_uv0 + vec2(0, 0.5)).r;\n  #endif\n  #if INPUT_IS_GAMMA\n    color.rgb *= (diffuseTexture_tmp.rgb * diffuseTexture_tmp.rgb);\n    color.a *= diffuseTexture_tmp.a;\n  #else\n    color *= diffuseTexture_tmp;\n  #endif\n  #endif\n  #if CC_USE_ATTRIBUTE_COLOR\n    color *= v_color;\n  #endif\n  ALPHA_TEST(color);\n  gl_FragColor = CCFragOutput(color);\n}"
        },
        "builtins": {
          "globals": {
            "blocks": [
              {
                "name": "CCGlobal",
                "defines": []
              }
            ],
            "samplers": []
          },
          "locals": {
            "blocks": [
              {
                "name": "CCLocal",
                "defines": []
              }
            ],
            "samplers": []
          }
        },
        "defines": [
          {
            "name": "CC_USE_SKINNING",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_JOINTS_TEXTRUE",
            "type": "boolean",
            "defines": [
              "CC_USE_SKINNING"
            ]
          },
          {
            "name": "CC_JOINTS_TEXTURE_FLOAT32",
            "type": "boolean",
            "defines": [
              "CC_USE_SKINNING",
              "CC_USE_JOINTS_TEXTRUE"
            ]
          },
          {
            "name": "CC_USE_ATTRIBUTE_UV0",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_ATTRIBUTE_COLOR",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_ATTRIBUTE_NORMAL",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_ATTRIBUTE_TANGENT",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "USE_DIFFUSE_TEXTURE",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "USE_ALPHA_TEST",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "OUTPUT_TO_GAMMA",
            "type": "boolean",
            "defines": []
          },
          {
            "name": "CC_USE_ALPHA_ATLAS_diffuseTexture",
            "type": "boolean",
            "defines": [
              "CC_USE_ATTRIBUTE_UV0",
              "USE_DIFFUSE_TEXTURE"
            ]
          },
          {
            "name": "INPUT_IS_GAMMA",
            "type": "boolean",
            "defines": [
              "CC_USE_ATTRIBUTE_UV0",
              "USE_DIFFUSE_TEXTURE"
            ]
          }
        ],
        "blocks": [
          {
            "name": "SKINNING",
            "members": [
              {
                "name": "jointsTextureSize",
                "type": 14,
                "count": 1
              }
            ],
            "defines": [
              "CC_USE_SKINNING",
              "CC_USE_JOINTS_TEXTRUE"
            ],
            "binding": 0
          },
          {
            "name": "JOINT_MATRIX",
            "members": [
              {
                "name": "jointMatrices",
                "type": 26,
                "count": 50
              }
            ],
            "defines": [
              "CC_USE_SKINNING"
            ],
            "binding": 1
          },
          {
            "name": "MAIN_TILING",
            "members": [
              {
                "name": "mainTiling",
                "type": 14,
                "count": 1
              },
              {
                "name": "mainOffset",
                "type": 14,
                "count": 1
              }
            ],
            "defines": [],
            "binding": 2
          },
          {
            "name": "ALPHA_TEST",
            "members": [
              {
                "name": "alphaThreshold",
                "type": 13,
                "count": 1
              }
            ],
            "defines": [
              "USE_ALPHA_TEST"
            ],
            "binding": 3
          },
          {
            "name": "UNLIT",
            "members": [
              {
                "name": "diffuseColor",
                "type": 16,
                "count": 1
              }
            ],
            "defines": [],
            "binding": 4
          }
        ],
        "samplers": [
          {
            "name": "jointsTexture",
            "type": 29,
            "count": 1,
            "defines": [
              "CC_USE_SKINNING",
              "CC_USE_JOINTS_TEXTRUE"
            ],
            "binding": 30
          },
          {
            "name": "diffuseTexture",
            "type": 29,
            "count": 1,
            "defines": [
              "USE_DIFFUSE_TEXTURE"
            ],
            "binding": 31
          }
        ],
        "record": null,
        "name": "builtin-unlit|unlit-vs|unlit-fs"
      }
    ]
  },
  {
    "__type__": "cc.Material",
    "_name": "builtin-2d-base",
    "_effectAsset": {
      "__uuid__": "28dPjdQWxEQIG3VVl1Qm6T"
    },
    "_techniqueData": {}
  },
  {
    "__type__": "cc.Texture2D",
    "content": "0,9729,9729,33071,33071,0,0,1"
  },
  [
    {
      "__type__": "cc.Prefab",
      "_name": "invitePanel",
      "data": {
        "__id__": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "invitePanel",
      "_children": [
        {
          "__id__": 2
        },
        {
          "__id__": 6
        },
        {
          "__id__": 10
        },
        {
          "__id__": 14
        },
        {
          "__id__": 18
        }
      ],
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 1
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ],
          "_sizeMode": 0
        },
        {
          "__type__": "ef802d0+axCDrJhqcZTxSeM",
          "node": {
            "__id__": 1
          }
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "9dz23Ymi9IFYsyT4vTyQUD"
        },
        "fileId": "cax/i4HAlMYod8ZPI2ChsO"
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "item0",
      "_parent": {
        "__id__": 1
      },
      "_children": [
        {
          "__id__": 3
        },
        {
          "__id__": 4
        },
        {
          "__id__": 5
        }
      ],
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 2
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ],
          "_spriteFrame": {
            "__uuid__": "9fuy0jNS9C8JC+8YUlRr42"
          }
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "9dz23Ymi9IFYsyT4vTyQUD"
        },
        "fileId": "e90+gi1vtFvoGfubg54xPJ"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 630,
        "height": 111
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          0,
          243.15,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "head",
      "_parent": {
        "__id__": 2
      },
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 3
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ]
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "9dz23Ymi9IFYsyT4vTyQUD"
        },
        "fileId": "4bhW2FE7FDL4/zTMcRmS8W"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 40,
        "height": 36
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          -230.444,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "name",
      "_parent": {
        "__id__": 2
      },
      "_components": [
        {
          "__type__": "cc.Label",
          "node": {
            "__id__": 4
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ],
          "_useOriginalSize": false,
          "_string": "1",
          "_N$string": "1",
          "_fontSize": 30,
          "_lineHeight": 30,
          "_N$horizontalAlign": 1,
          "_N$verticalAlign": 1,
          "_N$overflow": 2,
          "_N$cacheMode": 2
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "9dz23Ymi9IFYsyT4vTyQUD"
        },
        "fileId": "32FkxGkEdFxaDz4H7Udcuk"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 300,
        "height": 30
      },
      "_anchorPoint": {
        "__type__": "cc.Vec2",
        "y": 0.5
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          -176.237,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "btn",
      "_parent": {
        "__id__": 2
      },
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 5
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ],
          "_spriteFrame": {
            "__uuid__": "fcYXD4mkJFqrKEIMSWq+nb"
          }
        },
        {
          "__type__": "cc.Button",
          "node": {
            "__id__": 5
          },
          "_normalMaterial": {
            "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
          },
          "_N$transition": 3,
          "transition": 3
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "9dz23Ymi9IFYsyT4vTyQUD"
        },
        "fileId": "65LGiBmsBBmpLOIBQYWD4n"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 100,
        "height": 38
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          199.427,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "item1",
      "_parent": {
        "__id__": 1
      },
      "_children": [
        {
          "__id__": 7
        },
        {
          "__id__": 8
        },
        {
          "__id__": 9
        }
      ],
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 6
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ],
          "_spriteFrame": {
            "__uuid__": "9fuy0jNS9C8JC+8YUlRr42"
          }
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "9dz23Ymi9IFYsyT4vTyQUD"
        },
        "fileId": "a7hPeNqR9H84gzAF5KS70r"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 630,
        "height": 111
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          0,
          107.15,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "head",
      "_parent": {
        "__id__": 6
      },
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 7
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ]
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "9dz23Ymi9IFYsyT4vTyQUD"
        },
        "fileId": "e4uKOY1zRIuJIGpp77XJGU"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 40,
        "height": 36
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          -230.444,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "name",
      "_parent": {
        "__id__": 6
      },
      "_components": [
        {
          "__type__": "cc.Label",
          "node": {
            "__id__": 8
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ],
          "_useOriginalSize": false,
          "_string": "1",
          "_N$string": "1",
          "_fontSize": 30,
          "_lineHeight": 30,
          "_N$horizontalAlign": 1,
          "_N$verticalAlign": 1,
          "_N$overflow": 2,
          "_N$cacheMode": 2
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "9dz23Ymi9IFYsyT4vTyQUD"
        },
        "fileId": "20LJnzV35JE57wVNnKoOBL"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 300,
        "height": 30
      },
      "_anchorPoint": {
        "__type__": "cc.Vec2",
        "y": 0.5
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          -176.237,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "btn",
      "_parent": {
        "__id__": 6
      },
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 9
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ],
          "_spriteFrame": {
            "__uuid__": "fcYXD4mkJFqrKEIMSWq+nb"
          }
        },
        {
          "__type__": "cc.Button",
          "node": {
            "__id__": 9
          },
          "_normalMaterial": {
            "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
          },
          "_N$transition": 3,
          "transition": 3
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "9dz23Ymi9IFYsyT4vTyQUD"
        },
        "fileId": "abhZ0iYxZKc5OfE9CSzPAH"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 100,
        "height": 38
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          199.427,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "item2",
      "_parent": {
        "__id__": 1
      },
      "_children": [
        {
          "__id__": 11
        },
        {
          "__id__": 12
        },
        {
          "__id__": 13
        }
      ],
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 10
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ],
          "_spriteFrame": {
            "__uuid__": "9fuy0jNS9C8JC+8YUlRr42"
          }
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "9dz23Ymi9IFYsyT4vTyQUD"
        },
        "fileId": "840BWRXHxDkYQ5VaR+rRyM"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 630,
        "height": 111
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          0,
          -28.85,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "head",
      "_parent": {
        "__id__": 10
      },
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 11
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ]
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "9dz23Ymi9IFYsyT4vTyQUD"
        },
        "fileId": "65R7ZCEWVE3bSKpK3lecye"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 40,
        "height": 36
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          -230.444,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "name",
      "_parent": {
        "__id__": 10
      },
      "_components": [
        {
          "__type__": "cc.Label",
          "node": {
            "__id__": 12
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ],
          "_useOriginalSize": false,
          "_string": "1",
          "_N$string": "1",
          "_fontSize": 30,
          "_lineHeight": 30,
          "_N$horizontalAlign": 1,
          "_N$verticalAlign": 1,
          "_N$overflow": 2,
          "_N$cacheMode": 2
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "9dz23Ymi9IFYsyT4vTyQUD"
        },
        "fileId": "6fbWDsvyFFp4eTkBp4KNgq"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 300,
        "height": 30
      },
      "_anchorPoint": {
        "__type__": "cc.Vec2",
        "y": 0.5
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          -176.237,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "btn",
      "_parent": {
        "__id__": 10
      },
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 13
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ],
          "_spriteFrame": {
            "__uuid__": "fcYXD4mkJFqrKEIMSWq+nb"
          }
        },
        {
          "__type__": "cc.Button",
          "node": {
            "__id__": 13
          },
          "_normalMaterial": {
            "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
          },
          "_N$transition": 3,
          "transition": 3
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "9dz23Ymi9IFYsyT4vTyQUD"
        },
        "fileId": "bdEFlASTFKUarrE4TEmDPv"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 100,
        "height": 38
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          199.427,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "item3",
      "_parent": {
        "__id__": 1
      },
      "_children": [
        {
          "__id__": 15
        },
        {
          "__id__": 16
        },
        {
          "__id__": 17
        }
      ],
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 14
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ],
          "_spriteFrame": {
            "__uuid__": "9fuy0jNS9C8JC+8YUlRr42"
          }
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "9dz23Ymi9IFYsyT4vTyQUD"
        },
        "fileId": "ca1o/xSX1EOqDq8xmHBLfv"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 630,
        "height": 111
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          0,
          -164.85,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "head",
      "_parent": {
        "__id__": 14
      },
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 15
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ]
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "9dz23Ymi9IFYsyT4vTyQUD"
        },
        "fileId": "fcKjGFyNBJaoW0BLDOCVre"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 40,
        "height": 36
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          -230.444,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "name",
      "_parent": {
        "__id__": 14
      },
      "_components": [
        {
          "__type__": "cc.Label",
          "node": {
            "__id__": 16
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ],
          "_useOriginalSize": false,
          "_string": "1",
          "_N$string": "1",
          "_fontSize": 30,
          "_lineHeight": 30,
          "_N$horizontalAlign": 1,
          "_N$verticalAlign": 1,
          "_N$overflow": 2,
          "_N$cacheMode": 2
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "9dz23Ymi9IFYsyT4vTyQUD"
        },
        "fileId": "16Rhaxx/RN7I5oDIKDIvG0"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 300,
        "height": 30
      },
      "_anchorPoint": {
        "__type__": "cc.Vec2",
        "y": 0.5
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          -176.237,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "btn",
      "_parent": {
        "__id__": 14
      },
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 17
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ],
          "_spriteFrame": {
            "__uuid__": "fcYXD4mkJFqrKEIMSWq+nb"
          }
        },
        {
          "__type__": "cc.Button",
          "node": {
            "__id__": 17
          },
          "_normalMaterial": {
            "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
          },
          "_N$transition": 3,
          "transition": 3
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "9dz23Ymi9IFYsyT4vTyQUD"
        },
        "fileId": "5edwnICAJI1omSLgzca7iT"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 100,
        "height": 38
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          199.427,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "item4",
      "_parent": {
        "__id__": 1
      },
      "_children": [
        {
          "__id__": 19
        },
        {
          "__id__": 20
        },
        {
          "__id__": 21
        }
      ],
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 18
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ],
          "_spriteFrame": {
            "__uuid__": "9fuy0jNS9C8JC+8YUlRr42"
          }
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "9dz23Ymi9IFYsyT4vTyQUD"
        },
        "fileId": "3eYAujTFJPJr0Aee+ujTx+"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 630,
        "height": 111
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          0,
          -300.85,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "head",
      "_parent": {
        "__id__": 18
      },
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 19
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ]
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "9dz23Ymi9IFYsyT4vTyQUD"
        },
        "fileId": "5bkNUiHc1L9IYKfeMiL1UK"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 40,
        "height": 36
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          -230.444,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "name",
      "_parent": {
        "__id__": 18
      },
      "_components": [
        {
          "__type__": "cc.Label",
          "node": {
            "__id__": 20
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ],
          "_useOriginalSize": false,
          "_string": "1",
          "_N$string": "1",
          "_fontSize": 30,
          "_lineHeight": 30,
          "_N$horizontalAlign": 1,
          "_N$verticalAlign": 1,
          "_N$overflow": 2,
          "_N$cacheMode": 2
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "9dz23Ymi9IFYsyT4vTyQUD"
        },
        "fileId": "c0x+w7wIBATaVpo3md6PL+"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 300,
        "height": 30
      },
      "_anchorPoint": {
        "__type__": "cc.Vec2",
        "y": 0.5
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          -176.237,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "btn",
      "_parent": {
        "__id__": 18
      },
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 21
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ],
          "_spriteFrame": {
            "__uuid__": "fcYXD4mkJFqrKEIMSWq+nb"
          }
        },
        {
          "__type__": "cc.Button",
          "node": {
            "__id__": 21
          },
          "_normalMaterial": {
            "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
          },
          "_N$transition": 3,
          "transition": 3
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__uuid__": "9dz23Ymi9IFYsyT4vTyQUD"
        },
        "fileId": "3cSrf+S4hLlp7s2YV2GhXI"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 100,
        "height": 38
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          199.427,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    }
  ],
  {
    "__type__": "cc.SpriteFrame",
    "content": {
      "name": "zj",
      "texture": "799RJ+7LhE/IzUdAliwTIe",
      "rect": [
        1,
        114,
        630,
        111
      ],
      "offset": [
        0,
        0
      ],
      "originalSize": [
        630,
        111
      ],
      "capInsets": [
        0,
        0,
        0,
        0
      ]
    }
  },
  {
    "__type__": "cc.SpriteFrame",
    "content": {
      "name": "default_sprite_splash",
      "texture": "02delMVqdBD70a/HSD99FK",
      "rect": [
        0,
        0,
        2,
        2
      ],
      "offset": [
        0,
        0
      ],
      "originalSize": [
        2,
        2
      ],
      "capInsets": [
        0,
        0,
        0,
        0
      ]
    }
  },
  {
    "__type__": "cc.EffectAsset",
    "_name": "builtin-clear-stencil",
    "techniques": [
      {
        "passes": [
          {
            "blendState": {
              "targets": [
                {
                  "blend": true
                }
              ]
            },
            "rasterizerState": {
              "cullMode": 0
            },
            "program": "builtin-clear-stencil|vs|fs"
          }
        ]
      }
    ],
    "shaders": [
      {
        "hash": 2075641479,
        "glsl3": {
          "vert": "\nprecision highp float;\nin vec3 a_position;\nvoid main () {\n  gl_Position = vec4(a_position, 1);\n}",
          "frag": "\nprecision highp float;\nvoid main () {\n  gl_FragColor = vec4(1.0);\n}"
        },
        "glsl1": {
          "vert": "\nprecision highp float;\nattribute vec3 a_position;\nvoid main () {\n  gl_Position = vec4(a_position, 1);\n}",
          "frag": "\nprecision highp float;\nvoid main () {\n  gl_FragColor = vec4(1.0);\n}"
        },
        "builtins": {
          "globals": {
            "blocks": [],
            "samplers": []
          },
          "locals": {
            "blocks": [],
            "samplers": []
          }
        },
        "defines": [],
        "blocks": [],
        "samplers": [],
        "record": null,
        "name": "builtin-clear-stencil|vs|fs"
      }
    ]
  },
  [
    {
      "__type__": "cc.SceneAsset",
      "_name": "Demo",
      "scene": {
        "__id__": 1
      },
      "asyncLoadAssets": null
    },
    {
      "__type__": "cc.Scene",
      "_name": "New Node",
      "_children": [
        {
          "__id__": 2
        }
      ],
      "_active": false,
      "_anchorPoint": {
        "__type__": "cc.Vec2"
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      },
      "autoReleaseAssets": false
    },
    {
      "__type__": "cc.Node",
      "_name": "Canvas",
      "_parent": {
        "__id__": 1
      },
      "_children": [
        {
          "__id__": 3
        },
        {
          "__id__": 4
        }
      ],
      "_components": [
        {
          "__type__": "cc.Canvas",
          "node": {
            "__id__": 2
          },
          "_designResolution": {
            "__type__": "cc.Size",
            "width": 720,
            "height": 1280
          },
          "_fitWidth": true
        },
        {
          "__type__": "cc.Widget",
          "node": {
            "__id__": 2
          },
          "_alignFlags": 45
        },
        {
          "__type__": "11b69Wc9jpAr5h1unrzXyzn",
          "node": {
            "__id__": 2
          }
        }
      ],
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 720,
        "height": 1280
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          360,
          640,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      },
      "_id": "02Ui8psiNJT7wt7gTw4DcX"
    },
    {
      "__type__": "cc.Node",
      "_name": "Main Camera",
      "_parent": {
        "__id__": 2
      },
      "_components": [
        {
          "__type__": "cc.Camera",
          "node": {
            "__id__": 3
          },
          "_clearFlags": 7,
          "_backgroundColor": {
            "__type__": "cc.Color",
            "a": 0
          },
          "_depth": -1
        }
      ],
      "_color": {
        "__type__": "cc.Color"
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          0,
          0,
          534.3376741349987,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "New Sprite(Splash)",
      "_parent": {
        "__id__": 2
      },
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 4
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ],
          "_spriteFrame": {
            "__uuid__": "a2MjXRFdtLlYQ5ouAFv/+R"
          },
          "_sizeMode": 0
        }
      ],
      "_color": {
        "__type__": "cc.Color",
        "r": 255
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 100,
        "height": 100
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    }
  ],
  {
    "__type__": "cc.Material",
    "_name": "builtin-clear-stencil",
    "_effectAsset": {
      "__uuid__": "c0BAyVxX9JzZy8EjFrc9DU"
    },
    "_techniqueData": {}
  },
  [
    {
      "__type__": "cc.Prefab",
      "_name": "overRankPanel",
      "data": {
        "__id__": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "overRankPanel",
      "_children": [
        {
          "__id__": 2
        }
      ],
      "_components": [
        {
          "__type__": "4c2f8ukf4lN8qJZH9TwE2AG",
          "node": {
            "__id__": 1
          }
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__id__": 0
        },
        "fileId": "89MMdp5ABMxbJm5tSFKHly"
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "New Sprite(Splash)",
      "_parent": {
        "__id__": 1
      },
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 2
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ],
          "_spriteFrame": {
            "__uuid__": "a2MjXRFdtLlYQ5ouAFv/+R"
          },
          "_sizeMode": 0
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__id__": 0
        },
        "fileId": "cd4ngIAyFP1JYBtABQUles"
      },
      "_color": {
        "__type__": "cc.Color",
        "r": 130,
        "g": 69,
        "b": 167
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 500,
        "height": 600
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    }
  ],
  [
    {
      "__type__": "cc.Prefab",
      "_name": "historyPanel",
      "data": {
        "__id__": 1
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "historyPanel",
      "_children": [
        {
          "__id__": 2
        }
      ],
      "_components": [
        {
          "__type__": "4c2f8ukf4lN8qJZH9TwE2AG",
          "node": {
            "__id__": 1
          }
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__id__": 0
        },
        "fileId": "89MMdp5ABMxbJm5tSFKHly"
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    },
    {
      "__type__": "cc.Node",
      "_name": "New Sprite(Splash)",
      "_parent": {
        "__id__": 1
      },
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 2
          },
          "_materials": [
            {
              "__uuid__": "ecpdLyjvZBwrvm+cedCcQy"
            }
          ],
          "_spriteFrame": {
            "__uuid__": "a2MjXRFdtLlYQ5ouAFv/+R"
          },
          "_sizeMode": 0
        }
      ],
      "_prefab": {
        "__type__": "cc.PrefabInfo",
        "root": {
          "__id__": 1
        },
        "asset": {
          "__id__": 0
        },
        "fileId": "cd4ngIAyFP1JYBtABQUles"
      },
      "_color": {
        "__type__": "cc.Color",
        "r": 130,
        "g": 69,
        "b": 167
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 500,
        "height": 600
      },
      "_trs": {
        "__type__": "TypedArray",
        "ctor": "Float64Array",
        "array": [
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ]
      }
    }
  ],
  {
    "__type__": "cc.SpriteAtlas",
    "_name": "one.plist",
    "_spriteFrames": {
      "dsm_1": {
        "__uuid__": "fcYXD4mkJFqrKEIMSWq+nb"
      },
      "qtr": {
        "__uuid__": "2fHj+pFxpETJn5DPl0JiVA"
      },
      "zj": {
        "__uuid__": "9fuy0jNS9C8JC+8YUlRr42"
      }
    }
  },
  {
    "__type__": "cc.Material",
    "_name": "builtin-2d-sprite",
    "_effectAsset": {
      "__uuid__": "28dPjdQWxEQIG3VVl1Qm6T"
    },
    "_techniqueData": {
      "0": {
        "defines": {
          "USE_TEXTURE": true
        }
      }
    }
  },
  {
    "__type__": "cc.SpriteFrame",
    "content": {
      "name": "dsm_1",
      "texture": "799RJ+7LhE/IzUdAliwTIe",
      "rect": [
        633,
        1,
        100,
        38
      ],
      "offset": [
        0,
        0
      ],
      "originalSize": [
        100,
        38
      ],
      "rotated": 1,
      "capInsets": [
        0,
        0,
        0,
        0
      ]
    }
  }
];
