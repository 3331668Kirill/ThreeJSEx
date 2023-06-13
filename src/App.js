import * as THREE from 'three'
import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Environment, useGLTF, ContactShadows, OrbitControls } from '@react-three/drei'

function Model(props) {
    const group = useRef()

    const { nodes, materials } = useGLTF('/mac-draco.glb')

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 2) / 20 + 0.25, 0.1)
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 4) / 20, 0.1)
        group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, Math.sin(t / 8) / 20, 0.1)
        group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (-2 + Math.sin(t / 2)) / 2, 0.1)
    })

    return (
        <group ref={group} {...props} dispose={null}>
            <group rotation-x={-0.425} position={[0, -0.04, 0.41]}>
                <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
                    <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry} />
                    <mesh material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry} />
                    <mesh geometry={nodes['Cube008_2'].geometry}>

                        <Html className="content" rotation-x={-Math.PI / 2} position={[0, 0.05, -0.09]} transform occlude>
                            <div className="wrapper" onPointerDown={(e) => e.stopPropagation()}>

                                <div style={{textAlign: "center", fontSize: "26px"}}>Азамат! Поздравляю с Днем рождения</div>

                                <img style={{width: '97%', height: '100%'}}
                                    src="https://bronk.club/uploads/posts/2022-06/1656211304_1-bronk-club-p-smeshnie-pozdravleniya-30-let-muzhchine-kr-1.jpg" alt=""/>
                                <div style={{textAlign: "center", fontSize: "26px",width: '90%'}}>30 лет — первый серьезный возраст! Пусть все изменения будут</div>
                                <div style={{textAlign: "center", fontSize: "26px",width: '90%'}}>только позитивными, ведь это не только юбилей, но и самый</div>
                                <div style={{textAlign: "center", fontSize: "26px",width: '90%'}}>расцвет жизни! Желаю тебе накопления жизненной мудрости,</div>
                                <div style={{textAlign: "center", fontSize: "26px",width: '90%'}}>финансовой независимости, укрепления лидерских качеств!</div>
                            </div>
                        </Html>
                    </mesh>
                </group>
            </group>
            <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} />
            <group position={[0, -0.1, 3.39]}>
                <mesh material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
                <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
            </group>
            <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} />
        </group>
    )
}

export default function App() {
    return (
        <Canvas camera={{ position: [-5, 0, -15], fov: 55 }}>
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <Suspense fallback={null}>
                <group rotation={[0, Math.PI, 0]} position={[0, 1, -3]}>
                    <Model />
                </group>
                {/*<Environment preset="city" />*/}
            </Suspense>
            <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
            <OrbitControls enablePan={false} enableZoom={true} minPolarAngle={Math.PI / 2.3} maxPolarAngle={Math.PI / 2.2} />
        </Canvas>
    )
}
