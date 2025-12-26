import client from "../client.ts";

export interface Person {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export default class PersonService {
  static async getAll(): Promise<Person[]> {
    const res = await client.get<Person[]>("/persons/all");
    return res.data;
  }

  static async getById(id: number): Promise<Person> {
    const res = await client.get<Person>(`/persons/${id}`);
    return res.data;
  }

  static async search(query: string): Promise<Person[]> {
    const res = await client.get<Person[]>("/persons/search", {
      params: { query },
    });
    return res.data;
  }

  static async add(person: Person): Promise<{ state: string }> {
    const res = await client.post<{ state: string }>("/persons", person);
    return res.data;
  }

  static async update(person: Person): Promise<{ state: string }> {
    const res = await client.put<{ state: string }>("/persons/update", person);
    return res.data;
  }

  static async delete(id: number): Promise<{ state: string }> {
    const res = await client.delete<{ state: string }>(`/persons/delete/${id}`);
    return res.data;
  }
}
