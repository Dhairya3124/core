import { Container } from "@arkecosystem/core-kernel";
import { CryptoSuite } from "@packages/core-crypto";

import { BlockFilter } from "../../../packages/core-database/src/block-filter";

const container = new Container.Container();
const crypto = new CryptoSuite.CryptoSuite(CryptoSuite.CryptoManager.findNetworkByName("testnet"));

container.bind(Container.Identifiers.CryptoManager).toConstantValue(crypto.CryptoManager);
container.bind(Container.Identifiers.TransactionManager).toConstantValue(crypto.TransactionManager);
container.bind(Container.Identifiers.BlockFactory).toConstantValue(crypto.BlockFactory);

describe("BlockFilter.getExpression", () => {
    describe("BlockCriteria.unknown", () => {
        it("should return void expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ unknown: "123" } as any);

            expect(expression).toEqual({ op: "void" });
        });
    });

    describe("BlockCriteria.id", () => {
        it("should compare using equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ id: "123" });

            expect(expression).toEqual({ property: "id", op: "equal", value: "123" });
        });
    });

    describe("BlockCriteria.version", () => {
        it("should compare using equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ version: 1 });

            expect(expression).toEqual({ property: "version", op: "equal", value: 1 });
        });
    });

    describe("BlockCriteria.timestamp", () => {
        it("should compare using equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ timestamp: 3600 });

            expect(expression).toEqual({ property: "timestamp", op: "equal", value: 3600 });
        });

        it("should compare using between expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ timestamp: { from: 3600, to: 7200 } });

            expect(expression).toEqual({ property: "timestamp", op: "between", from: 3600, to: 7200 });
        });

        it("should compare using greater than equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ timestamp: { from: 3600 } });

            expect(expression).toEqual({ property: "timestamp", op: "greaterThanEqual", value: 3600 });
        });

        it("should compare using less than equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ timestamp: { to: 3600 } });

            expect(expression).toEqual({ property: "timestamp", op: "lessThanEqual", value: 3600 });
        });
    });

    describe("BlockCriteria.previousBlock", () => {
        it("should compare using equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ previousBlock: "456" });

            expect(expression).toEqual({ property: "previousBlock", op: "equal", value: "456" });
        });
    });

    describe("BlockCriteria.height", () => {
        it("should compare using equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ height: 100 });

            expect(expression).toEqual({ property: "height", op: "equal", value: 100 });
        });

        it("should compare using between expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ height: { from: 100, to: 200 } });

            expect(expression).toEqual({ property: "height", op: "between", from: 100, to: 200 });
        });

        it("should compare using greater than equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ height: { from: 100 } });

            expect(expression).toEqual({ property: "height", op: "greaterThanEqual", value: 100 });
        });

        it("should compare using less than equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ height: { to: 100 } });

            expect(expression).toEqual({ property: "height", op: "lessThanEqual", value: 100 });
        });
    });

    describe("BlockCriteria.numberOfTransactions", () => {
        it("should compare using equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ numberOfTransactions: 10 });

            expect(expression).toEqual({ property: "numberOfTransactions", op: "equal", value: 10 });
        });

        it("should compare using between expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ numberOfTransactions: { from: 10, to: 20 } });

            expect(expression).toEqual({ property: "numberOfTransactions", op: "between", from: 10, to: 20 });
        });

        it("should compare using greater than equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ numberOfTransactions: { from: 10 } });

            expect(expression).toEqual({ property: "numberOfTransactions", op: "greaterThanEqual", value: 10 });
        });

        it("should compare using less than equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ numberOfTransactions: { to: 10 } });

            expect(expression).toEqual({ property: "numberOfTransactions", op: "lessThanEqual", value: 10 });
        });
    });

    describe("BlockCriteria.totalAmount", () => {
        it("should compare using equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({
                totalAmount: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("10000"),
            });

            expect(expression).toEqual({
                property: "totalAmount",
                op: "equal",
                value: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("10000"),
            });
        });

        it("should compare using between expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({
                totalAmount: {
                    from: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("10000"),
                    to: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("20000"),
                },
            });

            expect(expression).toEqual({
                property: "totalAmount",
                op: "between",
                from: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("10000"),
                to: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("20000"),
            });
        });

        it("should compare using greater than equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({
                totalAmount: {
                    from: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("10000"),
                },
            });

            expect(expression).toEqual({
                property: "totalAmount",
                op: "greaterThanEqual",
                value: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("10000"),
            });
        });

        it("should compare using less than equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({
                totalAmount: {
                    to: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("10000"),
                },
            });

            expect(expression).toEqual({
                property: "totalAmount",
                op: "lessThanEqual",
                value: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("10000"),
            });
        });
    });

    describe("BlockCriteria.totalFee", () => {
        it("should compare using equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({
                totalFee: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("100"),
            });

            expect(expression).toEqual({
                property: "totalFee",
                op: "equal",
                value: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("100"),
            });
        });

        it("should compare using between expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({
                totalFee: {
                    from: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("100"),
                    to: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("200"),
                },
            });

            expect(expression).toEqual({
                property: "totalFee",
                op: "between",
                from: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("100"),
                to: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("200"),
            });
        });

        it("should compare using greater than equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({
                totalFee: {
                    from: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("100"),
                },
            });

            expect(expression).toEqual({
                property: "totalFee",
                op: "greaterThanEqual",
                value: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("100"),
            });
        });

        it("should compare using less than equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({
                totalFee: {
                    to: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("100"),
                },
            });

            expect(expression).toEqual({
                property: "totalFee",
                op: "lessThanEqual",
                value: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("100"),
            });
        });
    });

    describe("BlockCriteria.reward", () => {
        it("should compare using equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({
                reward: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("1000"),
            });

            expect(expression).toEqual({
                property: "reward",
                op: "equal",
                value: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("1000"),
            });
        });

        it("should compare using between expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({
                reward: {
                    from: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("1000"),
                    to: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("2000"),
                },
            });

            expect(expression).toEqual({
                property: "reward",
                op: "between",
                from: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("1000"),
                to: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("2000"),
            });
        });

        it("should compare using greater than equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({
                reward: {
                    from: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("1000"),
                },
            });

            expect(expression).toEqual({
                property: "reward",
                op: "greaterThanEqual",
                value: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("1000"),
            });
        });

        it("should compare using less than equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({
                reward: {
                    to: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("1000"),
                },
            });

            expect(expression).toEqual({
                property: "reward",
                op: "lessThanEqual",
                value: crypto.CryptoManager.LibraryManager.Libraries.BigNumber.make("1000"),
            });
        });
    });

    describe("BlockCriteria.payloadLength", () => {
        it("should compare using equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ payloadLength: 1000 });

            expect(expression).toEqual({ property: "payloadLength", op: "equal", value: 1000 });
        });

        it("should compare using between expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ payloadLength: { from: 1000, to: 2000 } });

            expect(expression).toEqual({ property: "payloadLength", op: "between", from: 1000, to: 2000 });
        });

        it("should compare using greater than equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ payloadLength: { from: 1000 } });

            expect(expression).toEqual({ property: "payloadLength", op: "greaterThanEqual", value: 1000 });
        });

        it("should compare using less than equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ payloadLength: { to: 1000 } });

            expect(expression).toEqual({ property: "payloadLength", op: "lessThanEqual", value: 1000 });
        });
    });

    describe("BlockCriteria.payloadHash", () => {
        it("should compare using equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ payloadHash: "123" });

            expect(expression).toEqual({ property: "payloadHash", op: "equal", value: "123" });
        });
    });

    describe("BlockCriteria.generatorPublicKey", () => {
        it("should compare using equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ generatorPublicKey: "123" });

            expect(expression).toEqual({ property: "generatorPublicKey", op: "equal", value: "123" });
        });
    });

    describe("BlockCriteria.blockSignature", () => {
        it("should compare using equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({ blockSignature: "123" });

            expect(expression).toEqual({ property: "blockSignature", op: "equal", value: "123" });
        });
    });

    describe("BlockCriteria.height and BlockCriteria.generatorPublicKey", () => {
        it("should compare using equal expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression({
                height: { from: 100 },
                generatorPublicKey: "123",
            });

            expect(expression).toEqual({
                op: "and",
                expressions: [
                    { property: "height", op: "greaterThanEqual", value: 100 },
                    { property: "generatorPublicKey", op: "equal", value: "123" },
                ],
            });
        });
    });

    describe("OrBlockCriteria", () => {
        it("should join using or expression", async () => {
            const blockFilter = container.resolve(BlockFilter);
            const expression = await blockFilter.getExpression([
                { height: { from: 100 }, generatorPublicKey: "123" },
                { height: { from: 300 }, generatorPublicKey: "456" },
            ]);

            expect(expression).toEqual({
                op: "or",
                expressions: [
                    {
                        op: "and",
                        expressions: [
                            { property: "height", op: "greaterThanEqual", value: 100 },
                            { property: "generatorPublicKey", op: "equal", value: "123" },
                        ],
                    },
                    {
                        op: "and",
                        expressions: [
                            { property: "height", op: "greaterThanEqual", value: 300 },
                            { property: "generatorPublicKey", op: "equal", value: "456" },
                        ],
                    },
                ],
            });
        });
    });
});