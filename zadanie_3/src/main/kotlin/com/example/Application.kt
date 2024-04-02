import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.features.json.*
import io.ktor.client.features.json.serializer.*
import io.ktor.client.request.*
import io.ktor.http.*

suspend fun main() {
    val client = HttpClient(CIO) {
        install(JsonFeature) {
            serializer = KotlinxSerializer(kotlinx.serialization.json.Json {
                ignoreUnknownKeys = true
            })
        }
    }

    val webhookUrl = "https://discord.com/api/webhooks/1221469437891448922/AXYJD0CG7tPhqhmRz-vKyhcflxgWdWsis0HvQfQvLP1yafl-MeTN4K7WM_dfJA-eGypl"
    val message = mapOf("content" to "Hello, Discord!")

    client.post<Unit>(webhookUrl) {
        contentType(ContentType.Application.Json)
        body = message
    }

    client.close()
}
