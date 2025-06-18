Project Introduction
====================

Project Description
-------------------

This quantum low-code tool enables users to build hybrid models combining classical and quantum logic in a visual, node-based interface.  
It provides intuitive controls, flexible scripting, and modular design suitable for both simulation and deployment.

System Architecture Overview
============================

:numref:`fig-architecture` presents an overview of the system architecture that supports the modeling and execution of quantum applications. In the diagram, components that remain unchanged are displayed in white, expanded components are shaded in gray, and newly introduced elements are highlighted in black.

The *Low-Code Modeler* provides an approach for modeling quantum algorithms. It includes several components: a drag-and-drop *editor* with a set of modeling constructs for designing quantum applications, a *validator* that checks syntactic and semantic correctness of the models, a *transformer* that prepares models for backend processing, and a *connector* for integrating external services. Additionally, the modeler offers a library of reusable templates to accelerate development.

Once the quantum application has been modeled, the transformer removes all data not needed by the *Low-Code Backend*. In the backend, the modeling constructs are enriched with corresponding OpenQASM 3 implementations, which can be selected or adapted based on the required circuit width. The resulting OpenQASM code is then returned to the frontend.

The OpenQASM code can either be forwarded to the extended *NISQ Analyzer* or directly sent to *Qunicorn*. The NISQ Analyzer assists in selecting a suitable quantum device based on the specific implementation. It has been extended to filter out backends that do not support conditional operations.

To enable this functionality, *QProv*, which is responsible for continuously collecting and storing information about available quantum devices, was also adapted to support the updated selection logic.

Once a suitable backend has been selected, *Qunicorn* executes the OpenQASM code. This component provides a unified interface for executing quantum applications across different quantum cloud providers.

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
