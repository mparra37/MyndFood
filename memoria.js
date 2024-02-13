const { OpenAI } = require("langchain/llms/openai");
const { BufferMemory } = require("langchain/memory");
const { ConversationChain } = require("langchain/chains");
const readline = require("readline");
const pizzip = require("pizzip");
const fs = require("fs").promises;
require('dotenv').config();




async function crear_escenario(){
    try{
      const data = await fs.readFile("./prompt.txt", "utf-8");
      console.log(data);
      return data;
    }catch(err){
      console.error(err);
      return "";
    }
}

//crear_escenario();


// Create readline interface for stdin and stdout
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY
});

//const model = new OpenAI({});
const memory = new BufferMemory();
// This chain is preconfigured with a default prompt
const chain = new ConversationChain({ llm: llm, memory: memory });



async function msj1(escenario){
  const res1 = await chain.call({ input: escenario });
  console.log({ res1 });

  //const res2 = await chain.call({ input: "Cuál es mi nombre?" });
  //console.log({ res2 });
};

async function iniciar_conversacion(){
    const escenario = await crear_escenario();
    await msj1(escenario);
}

iniciar_conversacion();



async function consultar(prompt){
  const res1 = await chain.call({ input: prompt });
  console.log({ res1 });
  return res1.response;
};

async function recibirMsj(){
     rl.question("Prompt (escriba salir para terminar): ", async (input) => {
        if(input.toLowerCase() === "salir"){
            console.log("Terminar");
            process.exit(0);
        } else{
          await consultar(input);
          recibirMsj();
        }

     });
};

//recibirMsj();

module.exports = { consultar };