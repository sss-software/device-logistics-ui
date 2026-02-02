import type { Logger } from "@/interfaces/logger.interface"

class ConsoleLogger implements Logger {
    info(message: string, meta?: unknown) {
        console.info(message, meta)
    }

    warn(message: string, meta?: unknown) {
        console.warn(message, meta)
    }

    error(message: string, meta?: unknown) {
        console.error(message, meta)
    }
}

export const logger: Logger = new ConsoleLogger()