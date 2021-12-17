import { MongoClient } from "mongodb"
import { disconnect } from "process"

export const MongoHelper = {
    client: null as MongoClient,
    async connect(url: string): Promise<void> {
        this.client = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    },
    async disconnect(): Promise<void> {
        await this.client.close()
    }
}