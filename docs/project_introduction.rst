Project Introduction
====================

Project Description
-------------------

This quantum low-code tool enables users to model quantum algorithms combining classical and quantum logic in a visual, node-based interface.  

:numref:`fig-architecture` presents an overview of the system architecture with the main components of the *Low-Code Modeler*:
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
   :alt: System Architecture Overview
   :name: fig-architecture
   :align: center
   :width: 90%

   Overview of the Quantum Low-Code Tool system architecture.


Modeling Constructs
-------------------

This tool provides several modeling constructs.  
Click on a construct below to learn more:

.. toctree::
   :maxdepth: 1
   :titlesonly:

   modelingconstructs_boundaryNodes
   modelingconstructs_operators
   modelingconstructs_dataTypes
   modelingconstructs_circuitLevelNodes
   modelingconstructs_customnodes
   modelingconstructs_controlStructureNodes
