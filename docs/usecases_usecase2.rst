Use Case: Deutsch–Jozsa and Shor’s Algorithm
--------------------------------------------


The Deutsch–Jozsa algorithm determines whether a given function is constant or balanced using only a single query. In this example, a 3-qubit input register and one ancilla qubit are used. A constant oracle is applied, and the expected measurement outcome on the input qubits is `000`, indicating that the function is constant.

Shor’s algorithm is used for integer factorization. Let `n` be the number to be factored, and `m` the smallest integer such that `2^m` is at least `n^2`. The quantum function computes `t^x mod n`, where `t` is an integer coprime to `n`. The quantum circuit uses two registers: the first with `m` qubits for the `x` values, and the second register to store the result using ancilla qubits. A quantum Fourier transform is then applied, followed by a measurement on the first register.

.. raw:: html

   <div style="display: flex; justify-content: space-between; gap: 1em;">

     <div style="flex: 1; text-align: center;">
       <img src="images/deutschJozsa.png" alt="Deutsch–Jozsa algorithm" style="width:100%;">
       <p><em>Deutsch–Jozsa algorithm modeled in the tool</em></p>
     </div>

     <div style="flex: 1; text-align: center;">
       <img src="images/shor.png" alt="Shor’s algorithm" style="width:100%;">
       <p><em>Shor’s algorithm modeled in the tool</em></p>
     </div>

   </div>


