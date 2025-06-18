Project Introduction
====================

Project Description
-------------------

This quantum low-code tool enables users to model quantum algorithms combining classical and quantum logic in a visual, node-based interface.

The main components of the *Low-Code Modeler*:

- **Editor**: drag-and-drop interface for modeling quantum applications using visual constructs  
- **Validator**: checks syntactic and semantic correctness of the created models  
- **Transformer**: prepares the validated model for backend processing  
- **Connector**: integrates external services into the modeling process  
- **Template Library**: provides reusable templates to accelerate development  

The system interacts with the following components:

- **Low-Code Backend:** Enriches modeling constructs with corresponding OpenQASM 3 implementations, selecting or adapting them based on the required circuit width. Returns the resulting OpenQASM code to the frontend.  
- **NISQ Analyzer:** Helps select suitable quantum devices and filters out backends that do not support conditional operations.  
- **QProv:** Continuously collects and stores information about available quantum devices and supports the updated selection logic.  
- **Qunicorn:** Executes the OpenQASM code once a suitable backend is selected.

.. figure:: images/architecture.png
   :alt: System architecture
   :target: images/architecture.png
   :width: 600px

   System architecture of the quantum low-code tool.




Modeling Constructs and Blocks
-------------------

The quantum low-code tool provides modeling constructs for defining quantum applications at different levels of abstraction. In particular, quantum modeling constructs offer both higher-level abstractions and lower-level modeling blocks representing quantum gates, while supporting users across a broad spectrum of quantum computing expertise.

The constructs are organized into five categories: Data Types, Circuit-Level Nodes, Boundary Nodes, Operators, Control Structure Nodes, and Custom Nodes. Each category includes visual elements that enable users to build quantum circuits, workflows, and logic in an intuitive way.

Detailed descriptions and examples for each construct type are provided in the corresponding subsections.

.. toctree::
   :maxdepth: 1
   :titlesonly:
   
   modelingconstructs_dataTypes
   modelingconstructs_circuitLevelNodes
   modelingconstructs_boundaryNodes
   modelingconstructs_operators
   modelingconstructs_controlStructureNodes
   modelingconstructs_customnodes
