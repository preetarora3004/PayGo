import { CustomerRepository } from "@workspace/api/modules/customer/customer.repository";
import { CustomerDTO } from "@workspace/api/modules/customer/customer.types";

export class CustomerService {
    private repo = new CustomerRepository();

    async createCustomer(data: CustomerDTO) {
        return await this.repo.createCustomer(data);
    }

    async getCustomer() {
        return await this.repo.getCustomer();
    }

    async getCustomerByUserId(userId: string) {
        return await this.repo.getCustomerByUserId(userId)
    }
}