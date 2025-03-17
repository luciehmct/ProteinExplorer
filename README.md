# Protein Data Analysis with OpenAI API  

This project utilizes the **Protein Data Set** from Kaggle to analyze protein sequences and structures. It uses the **OpenAI API** to enhance data processing and insights extraction.  

## Dataset  
- [Protein Data Set](https://www.kaggle.com/datasets/shahir/protein-data-set?select=pdb_data_seq.csv)  

## API Usage  
- OpenAI API: [Usage & Documentation](https://platform.openai.com/usage)  

## Running the Backend  
To start the API server in the background:  

```bash
nohup uvicorn main:app --host 0.0.0.0 --port 8000 --reload > api.log 2>&1 &
```

To stop the server:

```bash
pkill -f uvicorn
```
## Running the Frontend

To start the frontend:

```bash
npm start
```

## Future Steps  

- **Improve Frontend** – Enhance UI/UX for better data visualization and interaction.  
- **Add Clustering Model** – Implement clustering to group similar proteins based on sequence similarity.  
- **Expand API Functionality** – Integrate additional endpoints for protein structure prediction and feature extraction.  
