// import { Camera } from 'expo-camera';
// import * as GL from 'expo-gl';
// import { GLView } from 'expo-gl';
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import * as FileSystem from "expo-file-system";
// // import * as ImageManipulator from "expo-image-manipulator";
// import canvas, { Image as CanvasImage } from "react-native-canvas";
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// const vertShaderSource = `#version 300 es
// precision highp float;
// in vec2 position;
// out vec2 uv;
// void main() {
//   uv = position;
//   gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
// }`;

// const fragShaderSource = `#version 300 es
// precision highp float;
// uniform sampler2D cameraTexture;
// in vec2 uv;
// out vec4 fragColor;
// void main() {
//   fragColor = vec4(texture(cameraTexture, uv).rgb, 1.0);
// }`;

// interface State {
//     zoom: number;
//     type: any;
// }

// const [uri, setUri] = useState<string | Blob>();
// const [width, setWidth] = useState();
// const [height, setHeight] = useState();

// // See: https://github.com/expo/expo/pull/10229#discussion_r490961694
// // eslint-disable-next-line @typescript-eslint/ban-types
// class GLCameraScreen extends React.Component<{}, State> {
//     static title = 'Expo.Camera integration';

//     readonly state: State = {
//         zoom: 0,
//         type: Camera.Constants.Type.back,
//     };

//     _rafID?: number;
//     camera?: Camera;
//     glView?: GL.GLView;
//     texture?: WebGLTexture;

//     componentWillUnmount() {
//         if (this._rafID !== undefined) {
//             cancelAnimationFrame(this._rafID);
//         }
//     }

//     async createCameraTexture(): Promise<WebGLTexture> {
//         const { status } = await Camera.requestPermissionsAsync();

//         if (status !== 'granted') {
//             throw new Error('Denied camera permissions!');
//         }

//         return this.glView!.createCameraTextureAsync(this.camera!);
//     }

//     onContextCreate = async (gl: GL.ExpoWebGLRenderingContext) => {
//         // Create texture asynchronously
//         this.texture = await this.createCameraTexture();
//         const cameraTexture = this.texture;

//         // Compile vertex and fragment shaders
//         const vertShader = gl.createShader(gl.VERTEX_SHADER)!;
//         gl.shaderSource(vertShader, vertShaderSource);
//         gl.compileShader(vertShader);

//         const fragShader = gl.createShader(gl.FRAGMENT_SHADER)!;
//         gl.shaderSource(fragShader, fragShaderSource);
//         gl.compileShader(fragShader);

//         // Link, use program, save and enable attributes
//         const program = gl.createProgram()!;
//         gl.attachShader(program, vertShader);
//         gl.attachShader(program, fragShader);
//         gl.linkProgram(program);
//         gl.validateProgram(program);

//         gl.useProgram(program);

//         const positionAttrib = gl.getAttribLocation(program, 'position');
//         gl.enableVertexAttribArray(positionAttrib);

//         // Create, bind, fill buffer
//         const buffer = gl.createBuffer();
//         gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
//         const verts = new Float32Array([-2, 0, 0, -2, 2, 2]);
//         gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

//         // Bind 'position' attribute
//         gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

//         // Set 'cameraTexture' uniform
//         gl.uniform1i(gl.getUniformLocation(program, 'cameraTexture'), 0);

//         // Activate unit 0
//         gl.activeTexture(gl.TEXTURE0);

//         // Render loop
//         const loop = () => {
//             this._rafID = requestAnimationFrame(loop);

//             // Clear
//             gl.clearColor(0, 0, 1, 1);
//             // tslint:disable-next-line: no-bitwise
//             gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

//             // Bind texture if created
//             gl.bindTexture(gl.TEXTURE_2D, cameraTexture);

//             // Draw!
//             gl.drawArrays(gl.TRIANGLES, 0, verts.length / 2);

//             // Submit frame
//             gl.endFrameEXP();
//         };
//         loop();
//     };

//     takeFrame = async (gl: GL.ExpoWebGLRenderingContext) => {
//         const snapshot = await GLView.takeSnapshotAsync(gl, {
//             format: "jpeg",
//         });
//         setUri(snapshot.uri)
//     };

//     // cropFrame = async (uri) => {
//     //     const minX = 10
//     //     const minY = 10

//     //     const result = await ImageManipulator.manipulateAsync(uri, [
//     //         {
//     //             crop: {
//     //                 originX: minX,
//     //                 originY: minY,
//     //                 width,
//     //                 height
//     //             },
//     //         },
//     //     ]);

//     //     setUri(result.uri)
//     // };

//     // readImage = async (imgSrc, width, height, canvas) => {
//     //     setUri(imgSrc);
//     //     const context = canvas.getContext('2d');
//     //     const image = new CanvasImage(canvas);

//     //     const options = { encoding: "base64", compress: 0.4 };
//     //     const base64 = await FileSystem.readAsStringAsync(imgSrc, options);
//     //     const src = "data:image/jpeg;base64," + base64;
//     //     image.src = src;
//     //     image.addEventListener("load", () => {
//     //         context.drawImage(image, 0, 0);
//     //         context
//     //             .getImageData(0, 0, canvas.width, canvas.height)
//     //             .then((imageData) => {
//     //                 console.log(
//     //                     "Image data:",
//     //                     imageData,
//     //                     Object.values(imageData.data).length
//     //                 );
//     //             })
//     //             .catch((e) => {
//     //                 console.error("Error with fetching image data:", e);
//     //             });
//     //     });
//     // };

//     toggleFacing = () => {
//         this.setState(state => ({
//             type:
//                 state.type === Camera.Constants.Type.back
//                     ? Camera.Constants.Type.front
//                     : Camera.Constants.Type.back,
//         }));
//     };

//     zoomOut = () => {
//         this.setState(state => ({
//             zoom: state.zoom - 0.1 < 0 ? 0 : state.zoom - 0.1,
//         }));
//     };

//     zoomIn = () => {
//         this.setState(state => ({
//             zoom: state.zoom + 0.1 > 1 ? 1 : state.zoom + 0.1,
//         }));
//     };

//     render() {
//         return (
//             <View style={styles.container}>
//                 <Camera
//                     style={StyleSheet.absoluteFill}
//                     type={this.state.type}
//                     zoom={this.state.zoom}
//                     ref={ref => (this.camera = ref!)}
//                 />
//                 <GLView
//                     style={StyleSheet.absoluteFill}
//                     onContextCreate={this.onContextCreate}
//                     ref={ref => (this.glView = ref!)}
//                 />

//                 <View style={styles.buttons}>
//                     <TouchableOpacity style={styles.button} onPress={() => this.takeFrame}>
//                         <Text>Take Picture</Text>
//                     </TouchableOpacity>
//                 </View>

//                 <View style={styles.buttons}>
//                     <TouchableOpacity style={styles.button} onPress={this.toggleFacing}>
//                         <Text>Flip</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.button} onPress={this.zoomIn}>
//                         <Text>Zoom in</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.button} onPress={this.zoomOut}>
//                         <Text>Zoom out</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.button} onPress={() => this.takeFrame}>
//                         <Text>Take Picture</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'column',
//     },
//     camera: {
//         ...StyleSheet.absoluteFillObject,
//     },
//     buttons: {
//         flex: 1,
//         paddingHorizontal: 10,
//         backgroundColor: 'transparent',
//         flexDirection: 'row',
//         alignItems: 'flex-end',
//         justifyContent: 'space-around',
//     },
//     button: {
//         flex: 1,
//         height: 40,
//         margin: 10,
//         backgroundColor: 'white',
//         borderRadius: 8,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });

// export default GLCameraScreen;