Project Introduction
====================

Project Description
-------------------

This quantum low-code tool enables users to build hybrid models combining classical and quantum logic in a visual, node-based interface.  
It provides intuitive controls, flexible scripting, and modular design suitable for both simulation and deployment.

.. image:: images/project_overview.png
   :alt: Project Overview
   :align: center
   :width: 80%


Modeling Constructs
-------------------

This tool supports several modeling constructs to build flexible, visual workflows.

Each type is described below:

Boundary Nodes
^^^^^^^^^^^^^^

Boundary nodes define the entry and exit points of your model.  
They represent how data flows in and out of the system.

- **Input Node** – accepts data into the model  
- **Output Node** – exports results  
- **Measurement Trigger** – initiates quantum measurement

.. image:: images/boundarynodes.png
   :alt: Boundary Nodes
   :align: center
   :width: 70%


Operators
^^^^^^^^^

Operators are core functional elements that manipulate data.  
They perform mathematical, logical, or quantum operations.

- **Arithmetic**: Add, Subtract  
- **Logical**: AND, OR  
- **Quantum Gates**: H, X, CNOT

.. image:: images/operators.png
   :alt: Operators
   :align: center
   :width: 70%


Data Types
^^^^^^^^^^

Data types define the format of data flowing through the system.

- **Boolean**  
- **Integer / Float**  
- **Qubits**  
- **Complex Numbers**

.. image:: images/datatypes.png
   :alt: Data Types
   :align: center
   :width: 70%


Circuit-Level Nodes
^^^^^^^^^^^^^^^^^^^

These nodes allow low-level control over quantum circuits.

- **Quantum Register**  
- **Gate Blocks**  
- **Layered Execution**

.. image:: images/circuitlevelnodes.png
   :alt: Circuit-Level Nodes
   :align: center
   :width: 70%


Custom Nodes
^^^^^^^^^^^^

Users can define custom logic using scripting interfaces.

- **Python or QASM support**  
- **Reusable Blocks**  
- **Custom interfaces**

.. image:: images/customnodes.png
   :alt: Custom Nodes
   :align: center
   :width: 70%


Control Structure Nodes
^^^^^^^^^^^^^^^^^^^^^^^

Control structures handle conditional and looping behavior.

- **If / Else**  
- **Loops (While / For)**  
- **Switch / Case**

.. image:: images/controlstructurenodes.png
   :alt: Control Structures
   :align: center
   :width: 70%

