Boundary Nodes
--------------

Boundary nodes enable state preparation and measurement in the quantum model.

State preparation supports two modes:

- **Encode Value**: Maps a classical value to a quantum state based on a specified encoding type and an error bound. An error bound of zero means exact preparation, though exact preparation is not always possible. This mode has one input port for the classical value and one output port for the resulting quantum state. Users can also define custom encoding schemes.

- **Prepare State**: Initializes a specific named quantum state selected from predefined options or user-defined custom states.

- **Measurement**: Has one input port for a quantum register and two output ports: one for the classical measurement result and one for the post-measurement quantum state. Users specify which qubits to measure via an indices property, allowing partial measurement of selected qubits. Measurements are performed in the Z-basis by default, but alternative bases can be selected using Pauli strings.

.. figure:: images/boundary_nodes.png
   :alt: Boundary Nodes illustration
   :align: center
