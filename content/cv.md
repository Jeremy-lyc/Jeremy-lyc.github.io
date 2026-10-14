📄 [Download CV (PDF)](/Yucheng_Lin_CV.pdf)

## Education

**University of California, San Diego**  
M.S. in Computer Engineering  
*Sep 2026 - Jun 2027 (Expected)*

B.S. in Computer Engineering | GPA: 3.72/4.00 (Major: 3.80/4.00)  
*Sep 2022 - Jun 2026*  
Honors: Provost Honors (2022-2026)

**Relevant Coursework:** Probabilistic Reasoning (CSE 250A, graduate, in progress), Machine Learning (CSE 151A), Deep Learning (ECE 176), Computer Vision (CSE 152A), Linear Systems (ECE 101), Probability & Statistics (ECE 109), Algorithms (CSE 101), Computer Graphics & Simulation (CSE 167), Computer Architecture (CSE 141/141L), Operating Systems (CSE 120)

## Research Experience

**Existential Robotics Laboratory | Research Assistant**  
University of California, San Diego | Advisor: Prof. Nikolay Atanasov  
*Oct 2025 - Present*

- Assembled and configured a custom quadrotor (Jetson Orin NX, T-Motor F7 flight controller, Betaflight firmware) and wrote C++ MSP/SBUS interfaces linking the onboard computer to the flight controller.
- Turned a previously non-functional quadrotor MPC into a working controller by implementing the dynamics model and solver code-generation pipeline (acados) and integrating it into the C++ flight stack as the default simulation controller.
- Built a multi-robot simulator that imports any Gazebo scene or URDF robot, cutting setup from 2 hours to 5 minutes, with a bubble planner for concurrent multi-robot planning.
- Built a depth-camera mapping pipeline producing 2D log-odds occupancy grids and 3D point maps for robot navigation.
- Redesigned neighbor search in a bubble-based planner prototype to reuse overlapping-bubble geometry, producing up to 15% shorter paths on 2-D benchmarks.
- Reworked MPPI startup in a C++/ROS 2 navigation stack to turn while driving, cutting completion time by 20%; added regression tests for startup, recovery, and goal arrival.

**Active & Living Matter Lab | Research Assistant**  
University of California, San Diego | Advisor: Prof. Tzer-Han Tan  
*Sep 2024 - Present*

- Built an 8-robot swarm inspired by starfish embryos, reproducing crystal-like rotating formations in hardware.
- Led the upgrade of the swarm robots to their first remotely controlled version, building the prototype ESP32 circuit boards that enable wireless MQTT control of all 8 robots.
- Built AprilTag vision tracking with camera calibration, measuring each robot's position and angular velocity in real time.
- Bridged physical robots and simulation-trained RL policies, enabling the first hardware deployment of sim-trained policies.
- Modeled fluid interactions in MATLAB, identifying rotation-speed and spacing thresholds beyond which formations break apart.

## Selected Course Projects

More details, images, and a live demo are on the [Projects](/projects) page.

**Rating Prediction for Book Recommendation | CSE 158R**  
*Fall 2024*

- Placed 3rd of 710 students on the class rating-prediction leaderboard with an SVD collaborative-filtering model, grid-searching latent factors, learning rate, regularization, and epochs.
- Built a Random Forest read-prediction model on balanced positive/negative samples with popularity features, tuned via randomized search.

**Brain Tumor Detection from MRI | ECE 176**  
*Winter 2025*

- Trained a ResNet-10 classifier with batch normalization, raising test accuracy from 81.9% (logistic regression) to 94.0%.
- Fine-tuned Faster R-CNN (ResNet-50 + FPN) to localize tumors with bounding boxes.

**Real-Time GPU Particle Physics Simulation | CSE 167**  
*Fall 2025*

- Built a 2D physics engine inside a fragment shader, using a feedback buffer to persist per-particle state across frames.
- Implemented penalty-method collisions and semi-implicit Euler integration with interactive particle spawning.

**Custom 9-bit ISA CPU | CSE 141L**  
*Spring 2026*

- Co-designed a 9-bit ISA (14 opcodes), a SystemVerilog CPU, and a Python assembler as a team.
- Ran 16-bit Hamming-distance and 32-bit multiplication programs within 512 instructions, passing all 10 test cases.

## Engineering Experience

**Rocket Propulsion Laboratory | Daedalus Project**  
*Sep 2023 - Oct 2025*

- Implemented C++ mode logic (Launch, Fueling, Dev, Abort) and W5500 Ethernet links to the ground station, used in 3 static fires/launches with zero safety incidents.
- Built Arduino Nano + custom PCB telemetry that recorded flight data across 3 launches/tests.
- Modeled rocket aerodynamics in OpenRocket/SolidWorks, improving predicted apogee by 40%.

## Technical Skills

- **Programming:** Python, C++, C, Java, MATLAB
- **Robotics and Control:** MPC, MPPI, motion planning, Pinocchio, URDF/Xacro, OpenCV, AprilTag tracking
- **Simulation:** Gazebo, physics simulation, sim-to-real transfer
- **Embedded Systems:** ESP32, Arduino, flight controllers, firmware flashing, soldering
- **Machine Learning:** Reinforcement learning, PyTorch, TensorFlow, Keras, scikit-learn
- **Tools and Practices:** ROS 2, Linux, Git, regression testing, MQTT, WebSocket, NumPy, SciPy
- **Languages:** English, Chinese (Native)
