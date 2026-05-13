<script>
    import { onMount } from 'svelte';

    const speed = 0.2; 
    const drift = 0.08;
    const minDistance = 20;

    let balls = [
        { 
            x: 20, y: 30, 
            vx: (Math.random() - 0.5) * speed, 
            vy: (Math.random() - 0.5) * speed, 
            class: 'ball1' 
        },
        { 
            x: 80, y: 90, 
            vx: (Math.random() - 0.5) * speed, 
            vy: (Math.random() - 0.5) * speed, 
            class: 'ball2' 
        }
    ];

    let elements = [];

    onMount(() => {
        let frame;

        const move = () => {
            const dx = balls[0].x - balls[1].x;
            const dy = balls[0].y - balls[1].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < minDistance) {
                const force = (minDistance - distance) * 0.001;
                balls[0].vx += dx * force;
                balls[0].vy += dy * force;
                balls[1].vx -= dx * force;
                balls[1].vy -= dy * force;
            }

            balls = balls.map((ball, i) => {
                ball.vx += (Math.random() - 0.5) * drift * 0.1;
                ball.vy += (Math.random() - 0.5) * drift * 0.1;

                const currentSpeed = Math.sqrt(ball.vx ** 2 + ball.vy ** 2);
                if (currentSpeed > speed) {
                    ball.vx = (ball.vx / currentSpeed) * speed;
                    ball.vy = (ball.vy / currentSpeed) * speed;
                }

                ball.x += ball.vx;
                ball.y += ball.vy;
                
                const margin = 5; 
                if (ball.x < margin) { ball.x = margin; ball.vx *= -1; }
                if (ball.x > 100 - margin) { ball.x = 100 - margin; ball.vx *= -1; }
                if (ball.y < margin) { ball.y = margin; ball.vy *= -1; }
                if (ball.y > 100 - margin) { ball.y = 100 - margin; ball.vy *= -1; }

                if (elements[i]) {
                    elements[i].style.transform = `translate(calc(${ball.x}vw - 50%), calc(${ball.y}vh - 50%))`;
                }
                return ball;
            });

            frame = requestAnimationFrame(move);
        };

        move();
        return () => cancelAnimationFrame(frame);
    });
</script>

<div class="background-container">
    <div class="noise"></div>
    <div class="floating-gradients">
        {#each balls as ball, i}
            <div 
                bind:this={elements[i]} 
                class="gradient-ball {ball.class}"
            ></div>
        {/each}
    </div>
</div>

<style>
    .background-container {
        position: fixed;
        inset: 0;
        z-index: -1;
        background-color: var(--bg-container-color);
        overflow: hidden;
    }

    .noise {
        position: absolute;
        inset: 0;
        z-index: 1;
        opacity: 0.04;
        pointer-events: none;
        background-image: url('data:image/svg+xml;fragment-noise=0.5,5');
        background-repeat: repeat;
    }

    .floating-gradients {
        position: relative;
        width: 100%;
        height: 100%;
        filter: blur(80px); 
    }

    .gradient-ball {
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 50%;
        will-change: transform;
        opacity: 0.35;
    }

    .ball1 {
        width: 70vw;
        height: 70vw;
        background: radial-gradient(circle, #1e3a8a, #5b21b6, transparent 70%);
    }

    .ball2 {
        width: 60vw;
        height: 60vw;
        background: radial-gradient(circle, #9d174d, #ea580c, transparent 70%);
    }

    @media (max-width: 768px) {
        .ball1, .ball2 {
            width: 100vw;
            height: 100vw;
        }
    }
</style>
