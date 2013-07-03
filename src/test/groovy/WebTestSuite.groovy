import org.junit.AfterClass
import org.junit.BeforeClass
import org.junit.runner.RunWith
import org.junit.runners.Suite

@RunWith(Suite.class)
@Suite.SuiteClasses([
    HomePageTest.class,
    HostPageTest.class,
    ClientTest.class
])
class WebTestSuite {
    static def p

    @BeforeClass
    static void beforeClass() {
        def pb = new ProcessBuilder("node","app").redirectErrorStream(true)
        def env = pb.environment()
        env.put("PORT", "3001")

        p = pb.start()

        def th1 = Thread.start {
            BufferedReader stdoutReader = new BufferedReader(
                    new InputStreamReader(p.getInputStream()));
            String line;
            try {
                while ((line = stdoutReader.readLine()) != null) {
                    println("[out] " + line)
                }
            } catch (IOException e) {
            }
        }
    }

    @AfterClass
    static void afterClass() {
        if(p != null) {
            p.destroy()
        }
    }


}
