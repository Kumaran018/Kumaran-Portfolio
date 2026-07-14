// Vertex shader for custom Three.js particles
uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;

attribute float aScale;

varying vec3 vColor;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Generate organic wave movements
    modelPosition.y += sin(modelPosition.x * 2.0 + uTime) * 0.1 * aScale;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
    
    // Responsive sizing
    gl_PointSize = uSize * aScale * uPixelRatio;
    gl_PointSize *= (1.0 / - viewPosition.z);
}
