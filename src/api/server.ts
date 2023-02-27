let token = `71dce4da5928f169fb46de251b8b2fba4482ec77eaaa9f0b`

export const serverCalls = {
    get: async () => {
        const response = await fetch(`https://checker-scrawny-gojirasaurus.glitch.me//api/players`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },

    create: async(data: any = {}) => {
        const response = await fetch(`https://checker-scrawny-gojirasaurus.glitch.me/api/players`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error('Failed to Create new data on server')
        }

        return await response.json()
    },
    update: async (id:string, data:any = {}) => {
        const response = await fetch(`https://checker-scrawny-gojirasaurus.glitch.me/api/players/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
    },
    delete: async(id:string) => {
        const response = await fetch(`https://checker-scrawny-gojirasaurus.glitch.me/api/players/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        })
    }
}

export const serverCalls2 = {
    get: async (week:number) => {
        const response = await fetch(`https://www.fantasyfootballdatapros.com/api/players/2019/${week}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    }
}

export const serverCalls3 = {
    get: async () => {
        const response = await fetch(`https://www.fantasyfootballdatapros.com/api/players/2019/all`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    }
}

