<template>
    <div class="keyboard">
        <div class="row" v-for="(row, i) in lettres" :lettre="i">
            <button class="lettre" 
             v-for="lettre in row"
             :lettre="lettre"
             @click="appuyer(lettre)"
            > 
            {{ lettre }}
            </button>
        </div> 
        
        <div class="button-activite">
            <button class="button-delete" @click="$emit('delete')">Delete</button>
            <button class="button-enter" @click="$emit('enter')">Enter</button>
        </div>
    
    </div>


</template>

<script>
export default {
    name: "Keyboard",

    emits: ["lettre", "enter", "delete"],

    data() {
        return {
            lettres: [ ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                       ["J","K", "L", "M", "N", "O", "P", "Q", "R"],
                       ["S", "T", "U", "V", "W", "X", "Y", "Z"]
                     ]
        };
    },

    methods: {
        appuyer(lettre) {
            this.$emit('lettre', lettre)
        }
    }

}

</script>

<style scoped>
.keyboard {
  display: flex;
  flex-direction: column; 
  align-items: center;  
  gap: 10px;            
  margin-top: 20px;
}

.row {
  display: flex;
  gap: 8px;
}

.lettre {
  width: 40px;
  height: 50px;
  border-radius: 8px;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;

  background-color: #fffdfa;
  border: 1px solid #ddd;
  color: #333;

  transition: background-color 0.2s, transform 0.1s;
}

.lettre:hover {
  background-color: #cfcfcf;
}

.lettre:active {
  transform: scale(0.95);
}

/* zone des boutons */
.button-activite {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}

/* boutons Enter / Delete */
.button-enter,
.button-delete {
  padding: 10px 18px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.button-enter {
  background-color: white;
}

.button-enter:hover {
  background-color: #cfcfcf;
}

.button-delete {
  background-color: white;
}

.button-delete:hover {
  background-color: #cfcfcf;
}

.button-enter:active,
.button-delete:active {
  transform: scale(0.95);
}
</style>


