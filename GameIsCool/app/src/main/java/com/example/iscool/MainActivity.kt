package com.example.iscool

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.iscool.ui.theme.IsCoolTheme
import com.example.iscool.ui.theme.Screens.EndGameScreen
import com.example.iscool.ui.theme.Screens.PlayGameScreen
import com.example.iscool.ui.theme.Screens.StartGameScreen
import androidx.navigation.NavType
import androidx.navigation.navArgument

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            IsCoolTheme {
                IsCoolApp()
            }
        }
    }
}

@Preview
@Composable
fun IsCoolApp() {
    val navController = rememberNavController() //NavController is the navigation API

    //NavHost defines the navigation structure of the app
    NavHost(
        navController = navController,
        startDestination = "startGameRoute" //startGameScreen is shown when the app starts
    ){
        composable("startGameRoute") {
            StartGameScreen(navController)
        }
        composable("PlayGameRoute") {
            PlayGameScreen(navController)
        }
        composable("EndGameRoute/{points}", arguments = listOf(navArgument("points") { type = NavType.IntType })) { backStackEntry ->
            EndGameScreen(navController, backStackEntry.arguments?.getInt("points") ?: 0)
        }
    }
}