# My Love in the Galaxy 🌌

A cinematic, interactive 3D web experience built to celebrate memories in the stars.

![Project Preview](/public/cp-1.jpeg)

## ✨ Overview

**My Love in the Galaxy** is a romantic, immersive 3D application built with **React Three Fiber**. It places the user in a stunning orbital environment featuring a glowing heart-beat planet, dynamic star fields, and interactive "memory comets" that reveal personalized messages and photos when clicked.

This project demonstrates high-performance WebGL rendering, beautiful shader effects, and seamless UI integration.

## 🚀 Features

*   **Immersive 3D Environment**: A fully interactive 3D scene with orbit controls and zoom capability.
*   **Dynamic Planet**: A central celestial body with a rhythmic "heartbeat" glow pulse and atmospheric effects.
*   **Interactive Memories**: 
    *   **Comets**: Hundreds of orbiting comets that carry specific memories.
    *   **Memory Reveal**: Click on any comet to open a glassmorphic overlay revealing a photo and a personal message.
*   **Cinematic Effects**:
    *   **Intro Animation**: Smooth camera zoom-in from deep space upon loading.
    *   **Shooting Stars**: Randomized shooting stars across the background.
    *   **Meteor Shower**: A synchronized burst of shooting stars (configurable event).
*   **Capture The Moment**:
    *   **High-Res Video**: Built-in tool to record a 5-second 60FPS video loop of the scene.
*   **Audio Atmosphere**: Integrated ambient background music with mute control.

## 🛠️ Tech Stack

*   **Core**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
*   **3D Engine**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) (Three.js)
*   **Helpers**: [@react-three/drei](https://github.com/pmndrs/drei) (OrbitControls, Stars, Text, etc.)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) (UI) + `useFrame` (3D)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## 📦 Getting Started

### Prerequisites

*   Node.js (v16 or higher)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/my-galaxy.git
    cd my-galaxy
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser at `http://localhost:5173`.

## 🎨 Customization

### Adding Memories

To personalize the comets with your own photos and messages, edit the `memories` array in `src/components/Scene.tsx`:

```javascript
const memories = [
    { image: "/your-photo-1.jpg", message: "Your special message here..." },
    { image: "/your-photo-2.jpg", message: "Another memory..." },
    // Add as many as you like!
];
```
*Note: Ensure your images are placed in the `public/` directory.*

### Adjusting Visuals

*   **Planet Colors**: Edit `src/components/Planet.tsx` to change the `meshStandardMaterial` and glow colors.
*   **Message Text**: Edit `src/components/TextRing.tsx` to change the orbiting text.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Made with ❤️ and R3F*
