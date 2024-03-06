type responseItemType = {
    id: string;
    name: string;
};

export const fetchNames = async () => {
    const url = "https://www.usemodernfullstack.dev/api/v1/users";
    /**
     * 
     * let data: [] = []; - Questa dichiarazione specifica esplicitamente che data è un array 
     * vuoto e può contenere solo elementi di tipo array vuoto. È una dichiarazione più 
     * restrittiva, in quanto limita data a essere solo un array vuoto e non può contenere 
     * altri tipi di elementi.
     * 
     * let data: []; - Questa dichiarazione indica semplicemente che data è un array, ma non 
     * specifica il tipo di elementi che può contenere. È un modo più generico per dichiarare 
     * un array vuoto senza specificare ulteriori vincoli sui suoi elementi.
     * 
     */
    let data: responseItemType[] | [] = [];
    let names: responseItemType[] | [];
    try {
        const response = await fetch(url);
        data = (await response.json()) as responseItemType[];
        let updatedItem: responseItemType = {
            id: 'updated_at', 
            name: Date.now().toString()
        }
        data.push(updatedItem)
    } catch (err) {
        names = [];
    }
    names = data.map((item) => {return {id: item.id, name: item.name}});

    return names;
};